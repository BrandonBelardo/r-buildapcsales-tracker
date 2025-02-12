import Link from 'next/link';
import styled from 'styled-components';

export default function FirstPost() {
    return <StyledHeader>First Post! Back to <Link href="/">Home</Link></StyledHeader>;
}

const StyledHeader = styled.h1`
color: red;
`