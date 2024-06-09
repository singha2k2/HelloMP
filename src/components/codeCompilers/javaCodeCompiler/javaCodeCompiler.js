import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { useTheme } from "../../../context/ThemeContext";
import { useDebounce } from "../../../hooks/debouncing";
import { decryptData, processMessageToChatGPT } from "../../Dashboard/Chatbot";
import axios from "axios";
import { useParams } from "react-router-dom";

export const defaultCode =
  'public class Main{\n  public static void main(String[] args){\n    System.out.println("Hello");\n  }\n}';

function JavaCodeCompiler({ embeddedCode = defaultCode, testingCode }) {
  const { langauage } = useParams();
  const { darkMode } = useTheme();
  const [code, setCode] = useState("");
  const [compiledCode, setCompiledCode] = useState("Write Code to Start....");
  const [compilerError, setCompilerError] = useState("");
  const [compilerStatus, setCompilerStatus] = useState("Write to Start ....");
  const [aiSuggestions, setAiSuggestions] = useState("Write Code to Start....");
  const [isLoading, setIsLoading] = useState(false);
  const [isAiLoading, setAiIsLoading] = useState(false);
  const [errorLines, setErrorLines] = useState([]);

  const debouncedValue = useDebounce(code, 3000);

  const compileCode = async () => {
    if (debouncedValue) {
      const lang = "java";

      setIsLoading(true);
      setCompilerStatus("Compiling....");

      try {
        const response = await axios.post(
          "https://learning-server-olive.vercel.app/core/compile-java",
          {
            files: [
              {
                name: "Main.java",
                content: code,
              },
            ],
          }
        );

        const data = response.data;
        const output = data.stdout || data.stderr;

        setCompiledCode(output);

        // Extract error lines
        if (output.includes("error")) {
          const errorLines = output
            .split("\n")
            .filter((line) => line.includes("error"));
          setErrorLines(
            errorLines
              .map((line) => {
                const match = line.match(/Main.java:(\d+):/);
                return match ? parseInt(match[1], 10) : null;
              })
              .filter((line) => line !== null)
          );
          setCompilerError("Compilation Error");
        } else {
          setErrorLines([]);
          setCompilerError("");
        }

        setCompilerStatus("Compilation Complete");
        setIsLoading(false);
        // Process message for AI suggestions
        const newMessages = [{ message: output, sender: "user" }];
        try {
          setAiIsLoading(true);
          
          const API_KEY_RESPONSE = await axios.get(`https://learning-server-olive.vercel.app/keys/getBardKey`);
          const { encryptedData} = API_KEY_RESPONSE.data;
          const key = decryptData(encryptedData);
          
          const responseMessage = await processMessageToChatGPT(
            newMessages,
            key
          );
          console.log(responseMessage);
          setAiSuggestions(responseMessage);
          setAiIsLoading(false);
        } catch (error) {
          console.error(error);
          setAiSuggestions("Error fetching AI suggestions.");
          setAiIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        setCompilerError("An error occurred during compilation.");
        setCompiledCode("");
        setCompilerStatus("Error");
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    compileCode();
  }, [debouncedValue]);

  const handleCodeChange = (e) => {
    setCode(e.target.value);
    setCompiledCode("");
    setAiSuggestions("");
    setCompilerStatus("Write to Start ....");
    setErrorLines([]);
  };

  const compilerStyle = {
    height: "100vh",
    width: "100%",
    backgroundColor: darkMode ? "rgb(52, 58, 64)" : null,
    color: darkMode ? "white" : "black",
  };

  const renderHighlightedCode = () => {
    return code.split("\n").map((line, index) => (
      <div
        key={index}
        style={{
          backgroundColor: errorLines.includes(index + 1)
            ? "rgba(255, 0, 0, 0.3)"
            : "transparent",
        }}
      >
        {line}
      </div>
    ));
  };

  return (
    <div style={compilerStyle}>
      <div className="container text-white pt-4">
        <Card>
          <Card.Body>
            <h2 className="mb-4">{(langauage ? `${langauage.substring(0,1).toUpperCase()}${langauage.substring(1)}`:"Java" )} Code Compiler</h2>
            <Form>
              <Form.Group controlId="code">
                <Form.Label>Enter {(langauage ? `${langauage.substring(0,1).toUpperCase()}${langauage.substring(1)}`:"Java" )} Code:</Form.Label>
                <Form.Label className="d-flex">
                  Status: {compilerStatus}
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  value={code}
                  placeholder={defaultCode}
                  onChange={handleCodeChange}
                  style={{ whiteSpace: "pre-wrap", fontFamily: "monospace" }}
                />
                <pre>{renderHighlightedCode()}</pre>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>

        <div className="mt-4">
          <Card>
            <Card.Body className="success">
              <h3>
                Compiled Code:<i className="bi bi-file-earmark-code-fill"></i>
              </h3>

              {isLoading && (
                <div className="mt-4 text-center">
                  <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                </div>
              )}
              {compiledCode && !isLoading && (
                <p className="text text-success">{compiledCode}</p>
              )}
            </Card.Body>
          </Card>
        </div>

        <div className="mt-4">
          <Card>
            <Card.Body className="success">
              <h3>
                AI Suggestions:<i className="bi bi-robot"></i>
              </h3>

              {isAiLoading && (
                <div className="mt-4 text-center">
                  <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                </div>
              )}
              {aiSuggestions && !isAiLoading && (
                <i>
                  <p className="text text-primary">{aiSuggestions}</p>
                </i>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default JavaCodeCompiler;
