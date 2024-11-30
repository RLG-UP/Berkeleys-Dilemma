import dynamic from 'next/dynamic';

const PsMap = dynamic(() => import('./MapPageComponents/PsMap'), { ssr: false });

function Map() {
  return <PsMap />;
}

export default Map;