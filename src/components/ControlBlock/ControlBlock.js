import { Button, Form } from "react-bootstrap";
import styles from "./ControlBlock.module.css";

const ControlBlock = (props) => {
    return (
        <div className={styles.ControlBlock}>
            <div>Enter your own text or use one of these examples:</div>
            <div>
                {
                    props.examples.map((example, i) => {
                        return (
                            <Button 
                                key={i}
                                onClick={() => props.selectExample(example)}
                                className={styles.btn}
                            >
                                {example.title}
                            </Button>
                        )
                    })
                }
            </div>

            <div>
                <Form>
                    {
                        ['en', 'de'].map((lang, id) => {
                            return (
                                <Form.Check
                                    inline
                                    type="radio"
                                    key={id}
                                    label={lang === 'en' ? 'English' : 'German'}
                                    onChange={() => props.setLanguage(lang)}
                                    checked={lang === props.lang}
                                />
                            )
                        })
                    }
                </Form>
            </div>

            <div>
                <Button 
                    variant="secondary"
                    className={styles.btn}
                    onClick={props.clear}
                >
                    CLEAR
                </Button>
            </div>
        </div>
    )
}

export default ControlBlock;