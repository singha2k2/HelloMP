import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import { useTheme } from "../../../context/ThemeContext";
import { useDebounce } from "../../../hooks/debouncing";
import { decryptData, processMessageToChatGPT } from "../../Dashboard/Chatbot";
import axios from "axios";
import { useParams } from "react-router-dom";

export const defaultCode =
  'public class Main{\n  public static void main(String[] args){\n    for(int i = 0; i < 5; i++){\n      System.out.println(i + 1);\n    }\n  }\n}';

function VisualizeCode({ embeddedCode = defaultCode, testingCode }) {
  const { langauage } = useParams();
  const { darkMode } = useTheme();
  const [code, setCode] = useState(embeddedCode);
  const [compiledCode, setCompiledCode] = useState("Write Code to Start....");
  const [compilerError, setCompilerError] = useState("");
  const [compilerStatus, setCompilerStatus] = useState("Write to Start ....");
  const [aiSuggestions, setAiSuggestions] = useState("Write Code to Start....");
  const [isLoading, setIsLoading] = useState(false);
  const [isAiLoading, setAiIsLoading] = useState(false);
  const [errorLines, setErrorLines] = useState([]);
  const [executionLine, setExecutionLine] = useState(-1);
  const [executionOutput, setExecutionOutput] = useState("");

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

        // Simulate code execution
        if(!output.includes("error")){

            simulateExecution();
        }

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

  const simulateExecution = () => {
    const lines = code.split("\n");
    const outputLines = [];
    let i = 0;
    let currentLoopIndex = -1;
    let loopCounter = 0;
    let loopMax = 5;

    const executeLine = () => {
      if (i < lines.length) {
        setExecutionLine(i);
        const line = lines[i];

        // Check for loop start
        if (line.includes("for(") && currentLoopIndex === -1) {
          currentLoopIndex = i;
          loopCounter = 0;
          const match = line.match(/for\(.*;.*<(\d+);.*\)/);
          if (match) {
            loopMax = parseInt(match[1], 10);
          }
        }

        // Simulate the execution
        if (currentLoopIndex > -1) {
          if (line.includes("System.out.println") && loopCounter < loopMax) {
            const match = line.match(/System\.out\.println\((.*)\);/);
            if (match) {
              outputLines.push(eval(match[1].replace(/i/g, loopCounter)));
              setExecutionOutput(outputLines.join("\n"));
            }
            loopCounter++;
            setTimeout(executeLine, 1000); // Adjust delay as needed
            return;
          } else if (loopCounter >= loopMax) {
            currentLoopIndex = -1;
          }
        } else if (line.includes("System.out.println")) {
          const match = line.match(/System\.out\.println\((.*)\);/);
          if (match) {
            outputLines.push(eval(match[1]));
            setExecutionOutput(outputLines.join("\n"));
          }
        }

        i++;
        setTimeout(executeLine, 1000); // Adjust delay as needed
      } else {
        setExecutionLine(-1);
      }
    };
    try {
        
        executeLine();
    } catch (error) {
        setExecutionOutput(error);
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
    setExecutionLine(-1);
    setExecutionOutput("");
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
            : executionLine === index
            ? "rgba(0, 255, 0, 0.3)"
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
            <h2 className="mb-4">{(langauage ? `${langauage.substring(0,1).toUpperCase()}${langauage.substring(1)}`:"Java" )} Code Visualizer</h2>
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
                  style={{ whiteSpace: "pre-wrap", fontFamily: "monospace", overflow: "auto" }}
                />
                <pre style={{ overflow: "auto", maxHeight: "300px" }}>{renderHighlightedCode()}</pre>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>

        <div className="mt-4">
          <Card>
            <Card.Body className="success" style={{ overflow: "auto", maxHeight: "300px" }}>
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
            <Card.Body className="success" style={{ overflow: "auto", maxHeight: "300px" }}>
              <h3>
              Execution Output:<i className="bi bi-play-circle"></i>
              </h3>
              <pre>{executionOutput}</pre>
            </Card.Body>
          </Card>
        </div>

        <div className="mt-4">
          <Card>
            <Card.Body className="success" style={{ overflow: "auto", maxHeight: "210px" }}>
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

export default VisualizeCode;
