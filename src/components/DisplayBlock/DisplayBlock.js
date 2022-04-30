import { Button, Form, Container, Row, Col, Spinner } from "react-bootstrap"
import styles from "./DisplayBlock.module.css"
import { useEffect } from "react";
import AnswerSection from "./AnswerSection/AnswerSection";

const getPlaceholder = (lang) => {
    let language = lang === 'en' ? 'English' : 'German';
    return {
        passage: `1. Paste your passage\nEnter a text in ${language} about which you want to ask a question`,
        question: `2. Enter a question\nEnter a question in ${language} whose answer can be found in the text above`
    }
}

const DisplayBlock = (props) => {
    let { selectedExample, lang, passage, question, answer, setPassage, setQuestion, fetchAnswer, rate, setRate, loading, answerSegment} = { ...props }

    useEffect(() => {
        if (selectedExample) {
            setPassage(selectedExample.context[lang]);
            setQuestion(selectedExample.question[lang]);
        }
    }, [selectedExample, lang, setPassage, setQuestion])

    const inputChangeHandler = (section, value) => {
        if (section === 'passage') {
            props.setPassage(value)
        } else {
            props.setQuestion(value)
        }
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <Col sm={10} md={8}>
                    <Form className={styles.form}>
                        {
                            ['passage', 'question'].map((elem, id) => {
                                return (
                                    <div
                                        className={styles.inputSection}
                                        key={id}
                                    >
                                        <h6
                                            className={
                                                [
                                                    styles.inputAreaTitle,
                                                    elem === 'passage' && passage === "" ? styles.hidden : "",
                                                    elem === 'question' && question === "" ? styles.hidden : "",
                                                ].join(" ")
                                            }
                                        >
                                            {`${id + 1}. ${elem === 'passage' ? 'Passage' : 'Question'}`}
                                        </h6>
                                        <Form.Control
                                            as="textarea"
                                            placeholder={getPlaceholder(lang)[elem]}
                                            className={styles.inputArea}
                                            rows={elem === "passage" ? 8 : 4}
                                            onChange={(e) => inputChangeHandler(elem, e.target.value)}
                                            value={elem === "passage" ? passage : question}
                                        />
                                    </div>
                                )
                            })
                        }
                    </Form>

                    {
                        loading ?
                            <Spinner animation="border" variant="primary"/> : 
                            <AnswerSection 
                                answer={answer}
                                answerSegment={answerSegment}
                                rate={rate}
                                setRate={setRate}
                            />
                    }

                    <div>
                        <Button
                            className={styles.processBtn}
                            variant="success"
                            disabled={passage === "" || question === "" || loading}
                            onClick={() => fetchAnswer(question, passage)}
                        >
                            {`Get Answer (${lang === 'en' ? 'English' : 'German'})`}
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default DisplayBlock