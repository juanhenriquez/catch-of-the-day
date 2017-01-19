import React from 'react';

// Stateless functional component.
const Header = (props) => {
  return (
    <header className="top">
      <h1>
        Catch
        <span className="ofThe">
          <span className="of">of</span>
          <span className="the">the</span>
        </span>
        Day
      </h1>
      <h3 className="tagline"><span>{ props.tagline }</span></h3>
    </header>
  );
}

Header.propTypes = {
  tagline: React.PropTypes.string.isRequired
};

export default Header;

// Statefull Component in React
// class Header extends React.Component {
//   render() {
//     return (
//       <header className="top">
//         <h1>
//           Catch
//           <span className="ofThe">
//             <span className="of">of</span>
//             <span className="the">the</span>
//           </span>
//           Day
//         </h1>
//         <h3 className="tagline"><span>{ this.props.tagline }</span></h3>
//       </header>
//     )
//   }
// }