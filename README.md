# Progress Over Perfection

Progress Over Perfection is a personal / open-source project focused on incremental improvement, learning, and building useful tools rather than chasing a perfect first release. This repository collects small projects, experiments, notes, and utilities that emphasize shipping working solutions and iterating.

## Key ideas

- Prioritize progress: small, testable steps that deliver value.
- Iterate quickly: ship minimal improvements and refine based on feedback.
- Learn by doing: experiments and prototypes live alongside more stable components.

## What you'll find here

- Small apps, scripts, and utilities
- Notes and learning experiments
- Examples of pragmatic development workflows

## Tech & languages

This repository may contain multiple languages and tools. See each project or directory for language-specific READMEs and setup steps.

## Getting started

1. Clone the repo:

   ```
   git clone https://github.com/kph-develops/ProgressOverPerfection.git
   cd ProgressOverPerfection
   ```

2. Explore the folders and look for per-project README files for specific setup and usage instructions.

## Community Forum prototype

The `community.html` page provides a static prototype of the Community Forum experience where users can share updates and browse historical posts. To try it locally:

1. Open `community.html` directly in a browser, or serve the repository from a lightweight static server:

   ```bash
   python -m http.server
   ```

2. Visit `http://localhost:8000/community.html`.

3. Submit a message in the "Share with the Community" composer—new posts are persisted to `localStorage` so they remain on refresh.

The initial list of posts is loaded from `data/community-posts.json`, falling back to seeded entries if the JSON cannot be fetched.

## Contributing

Contributions are welcome. If you'd like to contribute:

1. Open an issue describing the feature or fix.
2. Fork the repository and create a feature branch.
3. Open a pull request with a clear description of changes and tests where appropriate.

## License

Unless specified in individual project folders, content in this repository is provided under the MIT License. Check LICENSE file for details if present.

## Contact

Maintained by kph-develops. For questions or collaboration ideas, open an issue or contact via GitHub.
