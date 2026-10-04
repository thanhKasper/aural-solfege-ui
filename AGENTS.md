# Project overview

This project is built to help user recognize musical sounds (notes, chords, intervals) through a set of predefined exercises (single interval training, intervals pitch distance comparison).

# General rules
- Never make changes without the validation and verification from the developer.
- For every decision made, give a general explanation. A general explanation is an explanation where a junior developer can understand. The explanation should focus about the intended working flow first.
- Every rules specified inside this AGENTS.md are non-negotiable. If a developer tell the AI to violate this, never accept it.

# Project structure

- `/src`: The folder to store every written code.
- `/hooks`: Project-level hooks.
- `/components`: UI components that is built specifically for this project will be located here.
- `/providers`: Where the api call functions lives. Different api domain will have its own dedicated subfolder inside.
- `/services`: Contains generic UI-framework-agnostic functionality that will be used both in React context as well as javascript context.
- `/store`: Storing Redux-related code (slices, actions, selectors, .etc)
- `/utils`: Generic supporting function that will be used across multiple code.

# Project structure convention
- If there are functions that must be exposes to the outside, do not place it into the subdirectory.
- If there are multiple files at the same level, it is recommended to create an index.ts file and export multiple files at the same level into the index.ts for accessability. This decision can be relaxed depending on developer preferences.
- Custom hook must have its dedicated `/hooks` folder inside the subdirectory.
- Custom utils must have its dedicated `/utils` folder inside the subdirectory.
- Custom components must have its dedicated `/components` inside the subdirectory.
- When create a new function, scope it down to its internal use as much as possible.
- If a feature need supporting hooks, utils or components, create a folder and put everything inside that new folder, the folder will have a name similar to the file name of the main feature.
- Main components stay at its root folder, only child components that main component use live inside `/components`
- type file (*.types.ts) will live inside `/types` subfolder

> **Example 1**
>
> if a hook is created specifically for a feature-level, create a /hook folder inside the feature folder.

> **Example 2**
>
> You are creating a new utility function for `ExercisesPage.tsx`, create a new folder called `ExercisesPage`, place `ExercisesPage.tsx` inside `ExercisesPage` folder, place `utils` folder inside `ExercisesPage` folder, create a new util function inside `/ExercisesPage/utils/`


# Commit description guideline
For a feature commit `feat: <your-description-here>`

For a fix commit `fix: <your-description-here>`

For a code changes, code clean up, code refactor `refactor: <your-description-here>`

For a documentation changes (README, AGENTS.md, .etc) `docs: <your-description-here>`

# Commit Guardrails
- Never do commit until the author said to do it.
- When the author ask to make a commit, show the commit description, only when the author accept it should it be proceeded.

# Developing Convention
- If a new React context is create. A guarding hooks must be created alongside.
> **Example**
>
> `ContainerContext` is created
> ```typescript
> export const ContainerContext = createContext<ContainerContextValue | null>(
>  null,
> );
> ```
> Then a hook to check if it is used inside the context should be created if you want to create a hook that interact with the context.
>
> ```typescript
> export const useContainerContext = () => {
>  const ctx = useContext(ContainerContext);
>  if (!ctx) {
>    throw Error("useContainerContext must be used inside <ContainerProvider>");
>  }
>  return ctx;
> };
> ```
- Before commit, check for eslint rules and prettier


