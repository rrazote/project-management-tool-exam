import { Container, Snackbar, Alert } from '@mui/material';
import ContentContainer from './containers/ContentContainer';
import { AppContextProvider } from './context/AppContextProvider';
import ActionContainer from './containers/ActionContainer';
import { useAppContext } from './context/AppContext';

function AppContent() {
  const { toastOpen, toastMessage, toastSeverity, handleCloseToast } =
    useAppContext();

  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100vh - 5rem)', // full height
        }}
      >
        <ActionContainer />
        <ContentContainer />
      </Container>

      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseToast}
          severity={toastSeverity}
          sx={{ width: '100%' }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

function App() {
  return (
    <AppContextProvider>
      <AppContent />
    </AppContextProvider>
  );
}

export default App;
