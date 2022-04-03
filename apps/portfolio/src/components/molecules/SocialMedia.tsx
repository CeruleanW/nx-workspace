import React from 'react';
import { EmailIcon, FacebookIcon, LinkedinIcon } from 'react-share';
import { Box, Link } from '@material-ui/core';

export default function SocialMedia(props) {
  const iconSize = 26;
  // const shareUrl = window.location.href;

  return (
    <Box display={'flex'} justifyContent={'space-between'}>
      <Link href='https://www.linkedin.com/in/yiyang-tech/'>
        <LinkedinIcon size={iconSize} round={true} />
      </Link>
      <Link href='mailto:yyang.techie@gmail.com'>
        <EmailIcon size={iconSize} round={true} />
      </Link>
      <Link href='https://www.facebook.com/fongeey/'>
        <FacebookIcon size={iconSize} round={true} />
      </Link>
    </Box>
  );
}
