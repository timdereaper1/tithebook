import styled from 'styled-components';

interface LoadingProps {
	active: boolean;
	cover?: boolean;
}

function Loading({ active }: LoadingProps) {
	if (!active) return null;

	return <Wrapper />;
}

const Wrapper = styled.div`
	position: absolute;
`;

export default Loading;
