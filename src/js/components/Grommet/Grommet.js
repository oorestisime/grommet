import React, { Component, useEffect, useState } from 'react';
import MobileDetect from 'mobile-detect';

import { colorIsDark } from 'grommet-styles';

import { ResponsiveContext, ThemeContext } from '../../contexts';
import { deepMerge, getBreakpoint, getDeviceBreakpoint } from '../../utils';
import { base as baseTheme } from '../../themes';

import { withDocs } from '../hocs';

import { StyledGrommet } from './StyledGrommet';

const wrapWithHocs = withDocs('Grommet');

const deviceResponsive = (userAgent, theme) => {
  if (userAgent) {
    const md = new MobileDetect(userAgent);
    if (md.phone()) {
      return getDeviceBreakpoint('phone', theme);
    }
    if (md.tablet()) {
      return getDeviceBreakpoint('tablet', theme);
    }
    return getDeviceBreakpoint('computer', theme);
  }
  return undefined;
}

const getDefaultBreakpoint = (theme) => {
  // TODO DEBUG workaround because first theme empty and not the base theme
  // at least in storybook
  if (theme.global.deviceBreakpoints) {
    return theme.global.deviceBreakpoints.table
  }
  return 'medium'
}

function GrommetImpl(props) {
  const { theme: propsTheme, userAgent, children, ...rest } = props;
  const [theme, setTheme] = useState(propsTheme)
  const [themeProp, setThemeProp] = useState()
  const [responsive, setResponsive] = useState(
    deviceResponsive(userAgent, theme) || getDefaultBreakpoint(theme))

  useEffect(() => {
    const onResize = () => {
      const breakpoint = getBreakpoint(window.innerWidth, theme);
      if (breakpoint !== responsive) {
        setResponsive(breakpoint);
      }
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize)
  })

  // --- deriveStateFromProps ---
  const nextTheme = deepMerge(baseTheme, propsTheme);
  if (!theme || propsTheme !== themeProp) {
    if (typeof props.theme.dark === 'undefined') {
      // calculate if background is dark or not
      // otherwise respect the property passed in the theme
      const { colors } = propsTheme.global;
      const color = colors.background;
      nextTheme.dark = color ? colorIsDark(color) : false;
    }
    setTheme(nextTheme)
    setThemeProp(theme)

  };

  return (
    <ThemeContext.Provider value={theme}>
      <ResponsiveContext.Provider value={responsive}>
        <StyledGrommet {...rest}>{children}</StyledGrommet>
      </ResponsiveContext.Provider>
    </ThemeContext.Provider>
  );
}

export const Grommet = wrapWithHocs(GrommetImpl);
