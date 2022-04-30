import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "react-bootstrap";
import styles from "./AnswerSection.module.css"

const AnswerSection = (props) => {
    let { answer, answerSegment, setRate, rate } = { ...props };
    let { segmentStart, segmentEnd, answerStart, answerEnd, context } = { ...answerSegment }

    let answerSection = (
        <div
            className={[
                styles.answerSection,
                answer ? "" : styles.hidden
            ].join(" ")}
        >
            <h6>3. Answer</h6>
            <Row>
                <Col md={9} sm={12}>
                    <h4 className={styles.answerText}>{answer}</h4>
                    <div className={styles.answerSegment}>
                        <span>{context ? `... ${context.slice(segmentStart, answerStart)}` : ""}</span>
                        <span style={{ background: "yellow", color: "#000", padding: "5px", borderRadius: "2px" }}>{answer}</span>
                        <span>{context ? `${context.slice(answerEnd, segmentEnd)} ...` : ""}</span>
                    </div>
                </Col>
               
                <Col md={3} sm={12} className="justify-content-center">
                    <Row className="justify-content-center">
                        {
                            ['yes', 'no'].map((elem, id) => {
                                return (
                                    <Col className={styles.rateBtnCol} key={id}>
                                        <FontAwesomeIcon
                                            icon={elem === 'yes' ? faThumbsUp : faThumbsDown}
                                            className={[
                                                styles.rateBtn,
                                                rate === elem ? styles[`selectedRateOption_${elem}`] : ""
                                            ].join(" ")}
                                            size="3x"
                                            onClick={() => setRate(elem)}
                                        />
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </Col>
            </Row>
        </div>
    )

    return answer ? answerSection : null;
}

export default AnswerSection;