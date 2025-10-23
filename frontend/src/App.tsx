import { useMemo, useState } from "react";

type GoalStatus = "active" | "completed";

type Goal = {
  id: string;
  title: string;
  category: string;
  description?: string;
  progress: number;
  status: GoalStatus;
  dueDate?: string;
  createdBy?: string;
};

const sampleGoals: Goal[] = [
  {
    id: "auth-coach",
    title: "Test Auth Goal 0qykvW",
    category: "Mindfulness",
    progress: 100,
    status: "active",
    description: "",
  },
  {
    id: "goal-b1",
    title: "Goal-ei84bavD",
    category: "Mindfulness",
    progress: 100,
    status: "completed",
    description: "",
  },
  {
    id: "goal-meditation",
    title: "Test Meditation Goal",
    category: "Mindfulness",
    progress: 0,
    status: "active",
    description: "Daily meditation practice for stress relief",
  },
  {
    id: "goal-test",
    title: "Test",
    category: "Mindfulness",
    progress: 40,
    status: "active",
    description: "",
    dueDate: "Due Oct 24, 2025",
  },
  {
    id: "goal-jdoe",
    title: "Test goal from Jdoe",
    category: "Wellness",
    progress: 0,
    status: "active",
    description: "Created in E2E test by Jdoe",
    createdBy: "Set by Jdoe",
  },
];

type ModalForm = {
  title: string;
  category: string;
  description: string;
  deadline: string;
  progress: number;
};

const defaultForm: ModalForm = {
  title: "",
  category: "",
  description: "",
  deadline: "",
  progress: 0,
};

function App() {
  const [goals] = useState<Goal[]>(sampleGoals);
  const [isModalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<ModalForm>(defaultForm);

  const categoryOptions = useMemo(() => {
    const categories = new Set(goals.map((goal) => goal.category));
    return Array.from(categories);
  }, [goals]);

  const openModal = () => {
    setForm(defaultForm);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="app-shell">
      <main className="page" aria-labelledby="page-title">
        <header className="top-bar">
          <div className="top-bar__left">
            <span>Welcome, Jdoe</span>
            <h1 id="page-title">My Goals</h1>
            <p style={{ margin: "6px 0 0", color: "#5d6f6e", fontSize: "0.95rem" }}>
              Track your progress and celebrate your achievements
            </p>
          </div>
          <div className="top-bar__right">
            <button className="icon-button" aria-label="Notifications">
              ⏰
            </button>
            <button className="icon-button" aria-label="Messages">
              ✉️
            </button>
            <button className="icon-button" aria-label="Profile">
              ☺️
            </button>
            <button className="new-goal-btn" onClick={openModal}>
              <span style={{ fontSize: "1.25rem", lineHeight: 1 }}>➕</span>
              <span>New Goal</span>
            </button>
          </div>
        </header>

        <section className="goal-grid" aria-label="Goals">
          {goals.map((goal) => {
            const statusLabel = goal.status === "completed" ? "Completed" : "Active";
            const statusClass = `goal-card__status goal-card__status--${goal.status}`;

            return (
              <article key={goal.id} className="goal-card">
                <div className="goal-card__header">
                  <div>
                    <span className="goal-card__category">{goal.category}</span>
                    <h2 className="goal-card__title">{goal.title}</h2>
                  </div>
                  <span className={statusClass}>{statusLabel}</span>
                </div>

                <div className="goal-card__progress">
                  <div>
                    <div style={{ color: "#5d6f6e", fontSize: "0.85rem", fontWeight: 600 }}>
                      Progress
                    </div>
                  </div>
                  <div
                    className="progress-bar"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={goal.progress}
                  >
                    <div className="progress-bar__fill" style={{ width: `${goal.progress}%` }} aria-hidden />
                  </div>
                  <div style={{ fontWeight: 700, color: "#2f3e3d", fontSize: "0.85rem" }}>
                    {goal.progress}%
                  </div>
                </div>

                <footer className="goal-card__footer">
                  {goal.description && (
                    <p className="goal-card__description">{goal.description}</p>
                  )}
                  {goal.dueDate && <span>{goal.dueDate}</span>}
                  {goal.createdBy && <span>{goal.createdBy}</span>}
                </footer>
              </article>
            );
          })}
        </section>
      </main>

      {isModalOpen && (
        <div className="modal-backdrop">
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="new-goal-title">
            <div className="modal__header">
              <h2 id="new-goal-title">Create New Goal</h2>
              <p>Define a goal to work toward and set your progress.</p>
            </div>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                closeModal();
              }}
            >
              <div className="form-control">
                <label htmlFor="goal-title">Title</label>
                <input
                  id="goal-title"
                  type="text"
                  placeholder="e.g., Daily Meditation Practice"
                  value={form.title}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, title: event.target.value }))
                  }
                  required
                />
              </div>

              <div className="form-control">
                <label htmlFor="goal-category">Category</label>
                <select
                  id="goal-category"
                  value={form.category}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, category: event.target.value }))
                  }
                  required
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categoryOptions.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label htmlFor="goal-description">Description (Optional)</label>
                <textarea
                  id="goal-description"
                  placeholder="Describe your goal..."
                  value={form.description}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, description: event.target.value }))
                  }
                />
              </div>

              <div className="form-control">
                <label htmlFor="goal-deadline">Deadline (Optional)</label>
                <input
                  id="goal-deadline"
                  type="date"
                  value={form.deadline}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, deadline: event.target.value }))
                  }
                />
              </div>

              <div className="form-control">
                <div className="range-wrapper">
                  <div className="range-wrapper__label">
                    <span>Progress</span>
                    <span>{form.progress}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={form.progress}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, progress: Number(event.target.value) }))
                    }
                  />
                </div>
              </div>

              <div className="modal__actions">
                <button type="button" className="cancel-btn" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Create Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
