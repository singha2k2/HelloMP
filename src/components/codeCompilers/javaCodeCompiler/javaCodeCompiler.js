import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { useTheme } from '../../../context/ThemeContext';
import { useDebounce } from '../../../hooks/debouncing';
import { processMessageToChatGPT } from '../../Dashboard/Chatbot';

export const defaultCode =
  'public class Main{\n  public static void main(String[] args){\n    System.out.println("Hello");\n  }\n}';

function JavaCodeCompiler({ embeddedCode = defaultCode, testingCode }) {
  const { darkMode } = useTheme();
  const [code, setCode] = useState('');
  const [compiledCode, setCompiledCode] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('Write to Start ....');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      message:
        'Hello!! I am your Personal Assistant ... You can ask me anything that you feel "I am confused".. I will provide my best information and promise you that you will understand better!',
      sender: 'ChatGPT',
    },
  ]);

  const debouncedValue = useDebounce(code, 3000);

  const compileCode = async () => {
    if (debouncedValue) {
      const lang = 'java';

      setIsLoading(true);
      setStatus('Compiling....');

      try {
        const response = await fetch('https://learning-server-olive.vercel.app/api/compile', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({ lang, code }),
        });
        const data = await response.json();

        const newMessage = {
          message: data.data.data.output,
          sender: 'user',
        };
        const newMessages = [...messages, newMessage];

        const responseMessage = await processMessageToChatGPT(newMessages);
        setCompiledCode(responseMessage);
        setStatus(data.message);
        setError('');
      } catch (error) {
        console.error(error);
        setError('An error occurred during compilation.');
        setCompiledCode('');
        setStatus('Error');
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
    // Clear compiled code and status on code change
    setCompiledCode('');
    setStatus('Write to Start ....');
  };

  const compilerStyle = {
    height: '100vh',
    width: '100%',
    backgroundColor: darkMode ? 'rgb(52, 58, 64)' : 'rgb(171, 171, 171)',
    color: darkMode ? 'white' : 'black',
  };

  return (
    <div style={compilerStyle} className="pb-5">
      <div className="container text-white pt-4">
        <Card>
          <Card.Body>
            <h2 className="mb-4">Java Code Compiler</h2>
            <Form>
              <Form.Group controlId="code">
                <Form.Label>Enter Java Code:</Form.Label>
                <Form.Label className="d-flex">Status: {status}</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={10}
                  value={code}
                  placeholder={defaultCode}
                  onChange={handleCodeChange}
                />
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>

        {isLoading && (
          <div className="mt-4 text-center">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        )}

        {error && (
          <div className="mt-4">
            <Alert variant="danger">{error}</Alert>
          </div>
        )}

        {compiledCode && !isLoading && (
          <div className="mt-4">
            <Card>
              <Card.Body className="success">
                <h3>Compiled Code:</h3>
                <pre>{compiledCode}</pre>
              </Card.Body>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

export default JavaCodeCompiler;
