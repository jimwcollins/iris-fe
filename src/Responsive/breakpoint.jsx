import React from 'react';
import MediaQuery from 'react-responsive';

const breakpoints = {
  desktop: '(min-width: 901px)',
  tablet: '(min-width: 601px) and (max-width: 900px)',
  tabPhone: '(max-width: 900px)',
  phone: '(max-width: 600px)',
};

export default function Breakpoint(props) {
  const breakpoint = breakpoints[props.screen] || breakpoints.desktop;

  return (
    <MediaQuery {...props} query={breakpoint}>
      {props.children}
    </MediaQuery>
  );
}
