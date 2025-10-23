const POSTS_DATA_PATH = new URL("../../data/community-posts.json", import.meta.url);
const STORAGE_KEY = "pop-community-posts";

const postsList = document.getElementById("postsList");
const form = document.getElementById("postForm");
const messageField = document.getElementById("postMessage");
const template = document.getElementById("postTemplate");

const fallbackPosts = [
  {
    id: "seed-1",
    author: "KHurlington",
    initials: "KH",
    message: "<3",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
  {
    id: "seed-2",
    author: "Jdoe",
    initials: "JD",
    message: "Dashboard test post from Jdoe",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 14).toISOString(),
  },
];

function formatTimeAgo(isoString) {
  const diffMs = Date.now() - new Date(isoString).getTime();
  const diffMins = Math.round(diffMs / 60000);
  if (Number.isNaN(diffMins) || diffMins < 1) {
    return "just now";
  }
  if (diffMins < 60) {
    return `${diffMins} minute${diffMins === 1 ? "" : "s"} ago`;
  }
  const diffHours = Math.round(diffMins / 60);
  if (diffHours < 24) {
    return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  }
  const diffDays = Math.round(diffHours / 24);
  if (diffDays < 30) {
    return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
  }
  const diffMonths = Math.round(diffDays / 30);
  if (diffMonths < 12) {
    return `${diffMonths} month${diffMonths === 1 ? "" : "s"} ago`;
  }
  const diffYears = Math.round(diffMonths / 12);
  return `${diffYears} year${diffYears === 1 ? "" : "s"} ago`;
}

function deriveInitials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase())
    .slice(0, 2)
    .join("");
}

function renderEmptyState() {
  const empty = document.createElement("div");
  empty.className = "empty-state";
  empty.innerHTML = "Nothing has been posted yet. Be the first to share!";
  postsList.replaceChildren(empty);
}

function renderPosts(items) {
  if (!items.length) {
    renderEmptyState();
    return;
  }

  const fragment = document.createDocumentFragment();
  items.forEach((post) => {
    const node = template.content.cloneNode(true);
    const avatar = node.querySelector(".post__avatar");
    const author = node.querySelector(".post__author");
    const timestamp = node.querySelector(".post__timestamp");
    const message = node.querySelector(".post__message");

    avatar.textContent = post.initials || deriveInitials(post.author || "?");
    author.textContent = post.author || "Anonymous";
    timestamp.textContent = formatTimeAgo(post.createdAt);
    message.textContent = post.message;

    fragment.appendChild(node);
  });

  postsList.replaceChildren(fragment);
}

function persistPosts(posts) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch (error) {
    console.warn("Unable to persist posts", error);
  }
}

function retrievePersistedPosts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return parsed;
  } catch (error) {
    console.warn("Unable to read posts", error);
    return null;
  }
}

async function loadPosts() {
  const persisted = retrievePersistedPosts();
  if (persisted) {
    renderPosts(persisted);
    return;
  }

  try {
    const response = await fetch(POSTS_DATA_PATH, { cache: "no-cache" });
    if (!response.ok) {
      throw new Error(`Failed to load posts: ${response.status}`);
    }
    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error("Unexpected data format");
    }
    persistPosts(data);
    renderPosts(data);
  } catch (error) {
    console.warn("Falling back to default posts", error);
    persistPosts(fallbackPosts);
    renderPosts(fallbackPosts);
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const message = messageField.value.trim();
  if (!message) {
    return;
  }

  const posts = retrievePersistedPosts() || [];
  const newPost = {
    id: `local-${Date.now()}`,
    author: "You",
    initials: "YOU",
    message,
    createdAt: new Date().toISOString(),
  };

  const updated = [newPost, ...posts];
  persistPosts(updated);
  renderPosts(updated);
  form.reset();
  messageField.focus();
}

form.addEventListener("submit", handleSubmit);
loadPosts();
