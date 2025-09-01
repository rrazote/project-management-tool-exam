import { Container, Pagination, Box, CircularProgress } from '@mui/material';
import TaskList from '../components/TaskList';
import { useAppContext } from '../context/AppContext';

const ContentContainer = () => {
	const { page, totalPages, setPage, loading } = useAppContext();

	const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	return (
		<Container
			sx={{
				display: 'flex',
				flexDirection: 'column',
				flex: 1,
				overflowY: 'auto',
				py: 2,
			}}
		>
			{loading ? (
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						height: '100%',
					}}
				>
					<CircularProgress size={40} />
				</div>
			) : (
				<>
					<TaskList />
					<Box
						sx={{
							position: 'sticky',
							bottom: 0,
							bgcolor: 'white',
							py: 1,
							display: 'flex',
							justifyContent: 'center',
							borderTop: '1px solid #ddd',
							paddingTop: '2rem',
						}}
					>
						<Pagination count={totalPages} page={page} onChange={handleChange} color='primary' />
					</Box>
				</>
			)}
		</Container>
	);
};

export default ContentContainer;
