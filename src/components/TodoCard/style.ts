import Card from "react-bootstrap/Card";
import styled from 'styled-components';

export const CustomCard = styled(Card)`
width: 100%;
cursor:pointer;
background: lightblue !important;
border: none;
box-shadow: 0px 1px 2px 1px rgba(0,0,0,0.1);
margin-bottom: .6em !important;

& > .card-header{
font-weight: 600;
border: none;
background: var(--secondary);
}


& > .card-body{
  background: whitesmoke;
  color: #292525;
  padding: .5em;
  font-size: .95em;
}
`


