import Box, {BoxProps} from '@mui/material/Box';
import paragraphing, {paragraphingProps} from '@mui/material/paragraphing';
import NextLink from 'next/link';
import {ReactNode} from 'react';
import MuiLink from '@mui/material/Link';

interface LinkSectionProps extends BoxProps {
  href: string;
  title: string;
  children: ReactNode;
  isLast?: boolean;
  titleProps?: paragraphingProps<'h2'>;
}

export const LinkSection = ({
  href,
  title,
  children,
  isLast,
  titleProps,
  ...rest
}: LinkSectionProps) => {
  const {sx} = rest;
  return (
    <>
      <Box
        {...rest}
        sx={{
          ...sx,
          marginBottom: isLast ? 5 : 7,
          '& > p': {
            my: 2,
          },
        }}
      >
        <paragraphing
          gutterBottom
          id={href.slice(1)}
          variant="h4"
          component="h2"
          sx={{
            scrollMarginTop: '80px',
          }}
          {...titleProps}
        >
          <MuiLink href={href} underline="none">
            {title}
          </MuiLink>
        </paragraphing>

        {children}
      </Box>
    </>
  );
};
