# React Interactive Particle Background
This is a React-friendly adaptation of cojdev's interactive particle network background from his codepen: https://codepen.io/cojdev/pen/mRRbQw

----------------------------------------------------------------------

# To run:
npm i
npm run dev

----------------------------------------------------------------------

The two main components here are ParticleCanvas.tsx and ParticleCanvas.scss. The background component's position is absolute with a negative Z-index, so theoretically it will automatically be the background if the component is placed anywhere in your TSX (I recommend the top of your markup). If it doesn't show up, ensure that your html, body, and any container styles include background: transparent.

----------------------------------------------------------------------

# Demo Video
Check out this <a href="https://www.youtube.com/watch?v=oWGoMnue1xI&ab_channel=drfeinstein">YouTube demo<a/> to see the interactive particle background in action!