const initialUsers = [
  {
    username: "ProgressAdmin",
    role: "Admin",
    goals: 2,
    gratitude: 3,
    journal: 5,
  },
  {
    username: "TestUsersITO",
    role: "Client",
    goals: 0,
    gratitude: 0,
    journal: 0,
  },
  {
    username: "testuser_mSqDshRt",
    role: "Client",
    goals: 0,
    gratitude: 4,
    journal: 8,
  },
  {
    username: "MJane",
    role: "Client",
    goals: 0,
    gratitude: 2,
    journal: 6,
  },
  {
    username: "Jdoe",
    role: "Client",
    goals: 1,
    gratitude: 1,
    journal: 5,
  },
  {
    username: "KHurylington",
    role: "Client",
    goals: 0,
    gratitude: 0,
    journal: 3,
  },
];

const state = {
  users: [...initialUsers],
};

const userList = document.getElementById("user-list");
const overview = document.getElementById("overview");
const userCount = document.getElementById("user-count");
const createUserForm = document.getElementById("create-user-form");
const formMessage = document.getElementById("form-message");

function setFormMessage(message, type = "success") {
  if (!formMessage) return;

  formMessage.textContent = message;
  formMessage.classList.remove("form__message--error", "form__message--success");

  if (!message) {
    return;
  }

  formMessage.classList.add(
    type === "error" ? "form__message--error" : "form__message--success"
  );
}

function formatRole(role) {
  return role === "Admin" ? "Admin" : "Client";
}

function refreshUserList() {
  userList.innerHTML = "";

  const template = document.getElementById("user-list-item-template");

  state.users.forEach((user) => {
    const node = template.content.cloneNode(true);
    node.querySelector(".user-list__name").textContent = user.username;
    node.querySelector(".user-list__role").textContent = formatRole(user.role);
    node.querySelector(".user-list__meta").textContent = `${user.journal} journal entries`;
    userList.appendChild(node);
  });

  userCount.textContent = state.users.length;
}

function refreshOverview() {
  overview.innerHTML = "";
  const template = document.getElementById("overview-card-template");

  state.users.forEach((user) => {
    const node = template.content.cloneNode(true);
    node.querySelector(".overview-card__name").textContent = user.username;
    node.querySelector(".overview-card__goals").textContent = user.goals;
    node.querySelector(".overview-card__gratitude").textContent = user.gratitude;
    node.querySelector(".overview-card__journal").textContent = user.journal;
    overview.appendChild(node);
  });
}

function handleCreateUser(event) {
  event.preventDefault();
  const data = new FormData(createUserForm);
  const username = data.get("username").trim();
  const password = data.get("password");

  if (!username || !password) {
    return;
  }

  const existingUser = state.users.find(
    (user) => user.username.toLowerCase() === username.toLowerCase()
  );

  if (existingUser) {
    setFormMessage(`User "${username}" already exists.`, "error");
    return;
  }

  state.users.push({
    username,
    role: "Client",
    goals: 0,
    gratitude: 0,
    journal: 0,
  });

  refreshUserList();
  refreshOverview();
  createUserForm.reset();
  createUserForm.querySelector("input[name='username']").focus();
  setFormMessage(`User "${username}" created successfully.`);
}

refreshUserList();
refreshOverview();
setFormMessage("");
createUserForm.addEventListener("submit", handleCreateUser);
createUserForm.addEventListener("input", () => setFormMessage(""));
