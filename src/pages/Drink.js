import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Container, Row, Spinner } from "reactstrap";

const Drink = () => {
    const { id } = useParams();
    const [drink, setDrink] = useState({});
    const [loading, setLoading] = useState(true);
    const ingredients = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

    const fetchData = async () => {
        const response = await fetch(
            `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await response.json(response);
        setDrink(data.drinks[0], setLoading(false));
        // console.log("DEBUG", data.drinks[0]);
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <section>
            <Container fluid="xl">
                <h1 className="my-4">About the Drink</h1>
                <Row className="border border-2 rounded-3 p-3 mx-2 mx-md-0">
                    {loading && <Spinner className="mx-auto " />}
                    {!loading && (
                        <>
                            <Col className="d-flex justify-content-center align-items-center" xs="12" md="4">
                                <div className="">
                                    <img
                                        className="rounded-3"
                                        src={drink.strDrinkThumb}
                                        style={{ height: "20rem" }}
                                    />
                                </div>
                            </Col>
                            <Col className="mt-3 mt-md-0" xs="12" md="8">
                                <h1 className="mb-3" style={{fontSize: "1.75rem"}}>{drink.strDrink}</h1>
                                <div
                                    className="bg-primary rounded-pill text-white px-3 py-1 fw-bold mb-2"
                                    style={{ width: "max-content", fontSize: "0.9rem" }}
                                >
                                    <span>{drink.strCategory}</span>
                                </div>
                                <h1 className="mb-2 fw-normal" style={{fontSize: "1.4rem"}}>{drink.strInstructions}</h1>
                                {/* {console.log(drink["strIngredient1"])} */}
                                <h1 className="mb-2 fw-normal" style={{fontSize: "1.4rem"}}>Ingredients : </h1>
                                <ol className="fw-normal" style={{fontSize: "1.2rem"}}>
                                    {ingredients.map((index) => {
                                        const indexIngredient = `strIngredient${index}`;
                                        if (drink[indexIngredient] !== null)
                                            return (
                                                <li key={index}>
                                                    {drink[indexIngredient]}
                                                </li>
                                            );
                                    })}
                                </ol>
                            </Col>
                        </>
                    )}
                </Row>
            </Container>
        </section>
    );
};

export default Drink;
