'use client';

import dynamic from 'next/dynamic';

export const DynamicSystemProvider = dynamic(() => import('./systemProvider'), {
    ssr: false
});