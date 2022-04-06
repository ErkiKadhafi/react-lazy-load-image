import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import {
    Collapse,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarText,
    NavbarToggler,
    NavItem,
    NavLink,
} from "reactstrap";

const NavbarCustom = () => {
    const history = useHistory();
    return (
        <Navbar color="light" expand="md" light container="xl">
            <NavbarBrand>KoktailJS</NavbarBrand>
            <NavbarToggler onClick={function noRefCheck() {}} />
            <Collapse navbar>
                <Nav className="me-auto" navbar>
                    <NavItem>
                        <Link to="/" className="nav-link">
                            Home
                        </Link>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    );
};

export default NavbarCustom;
