// project import
import Navigation from './Navigation';
import SimpleBar from 'core/components/SimpleBar';

const DrawerContent = () => (
  <SimpleBar
    sx={{
      '& .simplebar-content': {
        display: 'flex',
        flexDirection: 'column',
      },
    }}
  >
    <Navigation />
  </SimpleBar>
);

export default DrawerContent;
