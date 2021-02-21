import { useRouter } from 'next/router';
import { ComponentType, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Loading from '../components/Loading';
import useAuth from '../hooks/useAuth';

function withProtected(Component: ComponentType<any>) {
	return function (props: any) {
		const { push } = useRouter();
		const { isAuthenticated, loading } = useAuth();

		const pushRef = useRef(push);

		useEffect(() => {
			if (typeof isAuthenticated === 'boolean' && isAuthenticated === false) {
				pushRef.current('/signin');
			}
		}, [isAuthenticated]);

		function renderContent() {
			if (!isAuthenticated) return null;
			return <Component {...props} />;
		}

		return (
			<Wrapper>
				<Loading active={loading} />
				{renderContent()}
			</Wrapper>
		);
	};
}

const Wrapper = styled.div``;

export default withProtected;
