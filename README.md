# Declarativas

Declarative canvas for the browser.

[Official documentation](https://declarativas.mrbarry.com)

[<img src="https://img.shields.io/npm/v/declarativas?style=flat-square" alt="Npm" />](https://www.npmjs.com/package/declarativas)

## Why use declarativas?

- Components: Break up your canvas rendering into smaller unique components
- Customizable: Build your own canvas mutator components
- One-off renders: This is not an "application" library, there is no render loop
    - This is to make it easy to integrate into applications and frameworks that already provide state management or render scheduling

### What's in the box

- Built-in components
    - These are components I've used for projects and demos
    - They mostly serve my own purposes, and may have undesirable behaviours
    - They cover a lot of the canvas api, but may not cover every function
    - I'm open to PRs for additional components
- JSX-compatible `createElement`
- `createMutator` for direct canvas manipulation


### JSX compatible

Popular frameworks have really pushed to using JSX or similar setups (like Vue's templates).
JSX, or generally XML structure, makes it very easy to visualize the render heirarchy, and given the stateful nature of canvas, will also make it easy to know the current state your components are rendering to.

You can enable JSX using `jsconfig.json`

```json
{
  "compilerOptions": {
    "jsx": "react",
    "jsxFactory": "createElement"
  }
}
```

or as a pragma comment:

```jsx
/** jsx createElement */

import { createElement } from 'declarativas';
```


## Demo

[Demo](./src/demo) source is probably the more interactive demo currently.

## Other Resources

 - [Declarativas Beta Example Collection on CodePen.io](https://codepen.io/collection/nxpMVd)
