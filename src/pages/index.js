import React from 'react';
import {Redirect} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function Introduction() {
  return <Redirect to={useBaseUrl('/docs/introduction')} />;
}
