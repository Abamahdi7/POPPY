<p align="center">
  <img src="poppy-logo.webp" alt="Poppy Logo" width="380">
</p>

<p align="center">
  <em>Even the most tangled mind can find its way.</em>
</p>

---

## Project Status

This project is currently in the early building stage. We are just starting to build the application, and the core features are under active construction.

---

## About The Project

Poppy is an offline desktop application designed to help people focus on real work and stop losing time to digital distractions.

Many people sit in front of a computer for five hours and think they worked hard. In reality, they often spend less than half of that time doing focused work. The rest of the time is lost to opening new browser tabs, looking at phones, and taking small breaks that turn into long delays.

Poppy helps solve this problem by making planning simple, helping you start faster, and showing your true progress.

---

## The Problems Poppy Solves

Many people struggle with three common planning problems:

* **The Action Gap (Hard to Start):** Goals are often too large and unclear. Poppy helps break big goals into small, clear steps that you can start right away.
* **The Capacity Gap (Planning Too Much):** People often put too many tasks into one day and expect a perfect schedule. Poppy helps you make realistic plans that match your real energy and available time.
* **The Review Gap (Forgetting to Look Back):** Most people do not compare what they planned with what they actually finished. Poppy provides a simple review process so you understand your mistakes and do not repeat them.

---

## How It Works

* **Completely Offline:** Poppy runs only on your personal computer. It does not use cloud servers or internet sync, giving you a quiet workspace away from online distractions.
* **Weekly Planning:** At the start of the week, you select only the tasks you can realistically finish.
* **Weekly Review:** At the end of the week, you check what you finished and what you delayed, giving you an honest look at your work.
* **Purpose First:** Before starting a goal, you write down why it matters to you so you stay motivated.
* **Less Planning, More Action:** Planning should not be a way to avoid real work. Poppy makes your next step clear so that starting is easy.

---

## Who Is It For?

Poppy is built for anyone who wants to organize their work better:

* Students learning new skills on their own.
* People working on personal projects.
* Anyone looking for a simple tool that leads to real progress instead of complicated task lists.

---

## Immediate Next Steps

Because the project is just beginning, current work focuses on:

1. Building the basic desktop user interface.
2. Creating the weekly planning and task breakdown views.
3. Adding the weekly review dashboard.
4. Setting up local data storage on the user's computer.

## Website

[Open the Poppy website](https://poppy-small-steps.bronzegrass16.chatgpt.site/)

The complete introduction website is included in [`website/`](website/). It contains the responsive English page, interactive Poppy expressions, WhatsApp join buttons, images and local fonts.

- [Website source and setup guide](website/README.md)
- [Main page](website/index.html)
- [Styles](website/styles.css)
- [Interactions](website/app.js)

Run it locally from this repository:

```sh
python -m http.server 4173 --directory website
```

Then open `http://localhost:4173`. No dependency installation or build step is required.

