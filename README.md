# React Interactive Particle Background
This is a React-friendly adaptation of cojdev's interactive particle network background from his codepen: https://codepen.io/cojdev/pen/mRRbQw

npm package: https://www.npmjs.com/package/react-interactive-particle-background

----------------------------------------------------------------------

# <a href="https://www.youtube.com/watch?v=oWGoMnue1xI&ab_channel=drfeinstein">Demo video<a/>

______________________________________________________________________

# To run:

npm i

npm run dev

----------------------------------------------------------------------

The package includes two core files: ParticleBackground.tsx and ParticleBackground.scss.

ParticleBackground.tsx provides an absolute-positioned background with a negative Z-index, allowing it to function as the background of your page, regardless of where it is placed within your JSX. For best results, it's recommended to insert it at the top of your component tree or whatever page you want it in.

If the background is not displaying, ensure that the html, body, and any container elements have their background set to transparent. This will prevent any conflicts and ensure the particle background renders correctly.

----------------------------------------------------------------------

# Usage

```js
import { ParticleBackground } from 'react-interactive-particle-background';

const App = () => (
  <ParticleBackground particleColor="255, 255, 255" particleSpeed={2.0} />
);

export default App;
```