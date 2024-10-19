# React Interactive Particle Background
This is a React-friendly adaptation of cojdev's interactive particle network background from his codepen: https://codepen.io/cojdev/pen/mRRbQw

----------------------------------------------------------------------

# To run:
npm i

npm run dev

----------------------------------------------------------------------

The package includes two core components: ParticleBackground.tsx and ParticleBackground.scss.

ParticleBackground.tsx provides an absolute-positioned background with a negative Z-index, allowing it to seamlessly function as the background of your application, regardless of where it is placed within your JSX. For best results, it's recommended to insert it at the top of your component tree.

If the background is not displaying as expected, ensure that the html, body, and any container elements have their background property set to transparent. This will prevent any conflicts and ensure the particle background renders correctly.

----------------------------------------------------------------------

# Demo Video
Check out this <a href="https://www.youtube.com/watch?v=oWGoMnue1xI&ab_channel=drfeinstein">YouTube demo<a/> to see the interactive particle background in action!

______________________________________________________________________

# Usage

import { ParticleBackground } from 'react-interactive-particle-background';

const App = () => (
  <ParticleBackground particleColor="255, 255, 255" particleSpeed={2.0} />
);

export default App;
