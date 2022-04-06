import Hello from "../components/Hello";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Button,
    Card,
    CardBody,
    CardImg,
    CardSubtitle,
    CardText,
    CardTitle,
    Col,
    Container,
    Input,
    Row,
    Spinner,
} from "reactstrap";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Home = () => {
    const [cocktails, setCocktails] = useState({ drinks: [] });
    const [copyOfCocktails, setCopyOfCocktails] = useState({ drinks: [] });
    const [loading, setLoading] = useState(true);
    const [input, setInput] = useState({ search: "" });
    const history = useHistory();
    const fetchData = async () => {
        const response = await fetch(
            "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a"
        );
        const data = await response.json();
        setCocktails(data.drinks);
        setCopyOfCocktails(data.drinks, setLoading(false));
        // console.log("debug", cocktails.drinks);
    };
    useEffect(() => {
        fetchData();
    }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
        const filteredCocktails = cocktails.filter((cocktail) =>
            cocktail.strDrink.toLowerCase().includes(value.toLowerCase())
        );
        setCopyOfCocktails(filteredCocktails);
    };

    return (
        <section>
            <Container fluid="xl">
                <h1>List of Cocktails</h1>
                <div className="my-4">
                    <Input
                        type="text"
                        name="search"
                        value={input.search}
                        onChange={handleChange}
                        placeholder="Input Cocktail Name"
                    />
                </div>
                <Row className="g-3">
                    {loading && (
                        <Spinner
                            className="mx-auto"
                            style={{ marginTop: "10rem" }}
                        />
                    )}
                    {copyOfCocktails.length > 0 &&
                        copyOfCocktails.map((cocktail) => {
                            let instructions = cocktail.strInstructions;
                            const detailLink = `/drink/` + cocktail.idDrink;
                            if (instructions.length > 25) {
                                instructions = instructions.slice(0, 25);
                                instructions += "...";
                                // console.log(inst)
                            }
                            return (
                                <Col
                                    key={cocktail.idDrink}
                                    xs="12"
                                    sm="6"
                                    md="4"
                                    // lg="3"
                                >
                                    <Card>
                                        <LazyLoadImage
                                            effect="blur"
                                            alt="Card image cap"
                                            src={cocktail.strDrinkThumb}
                                            top
                                            width="100%"
                                        />
                                        <CardBody>
                                            <CardTitle tag="h5">
                                                {cocktail.strDrink}
                                            </CardTitle>
                                            <CardSubtitle
                                                className="mb-2 text-muted"
                                                tag="h6"
                                            >
                                                Category :{" "}
                                                {cocktail.strCategory}
                                            </CardSubtitle>
                                            <CardText>{instructions}</CardText>
                                            <Button
                                                color="primary"
                                                onClick={() => {
                                                    history.push(detailLink);
                                                }}
                                            >
                                                Detail
                                            </Button>
                                        </CardBody>
                                    </Card>
                                </Col>
                            );
                        })}
                </Row>
            </Container>
        </section>
    );
};

export default Home;
