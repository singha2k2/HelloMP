
const reactQuestions = [
    {
        question: "What is JSX in React?",
        answers: [
            { text: "JavaScript Syntax Extension", correct: true },
            { text: "JavaScript XML", correct: false },
            { text: "JavaScript XML Syntax", correct: false },
            { text: "JavaScript Extended Markup", correct: false }
        ]
    },
    {
        question: "What are props in React?",
        answers: [
            { text: "Properties that are passed to components", correct: true },
            { text: "A way to define component styles", correct: false },
            { text: "A way to handle component state", correct: false },
            { text: "A type of component in React", correct: false }
        ]
    },
    {
        question: "What is the purpose of state in React?",
        answers: [
            { text: "To store data that can change over time", correct: true },
            { text: "To define static data for components", correct: false },
            { text: "To handle component events", correct: false },
            { text: "To define the structure of a component", correct: false }
        ]
    },
    {
        question: "What is a React component?",
        answers: [
            { text: "A reusable piece of UI", correct: true },
            { text: "A function that returns JSX", correct: false },
            { text: "A class that extends React.Component", correct: false },
            { text: "All of the above", correct: false }
        ]
    },
    {
        question: "What is the virtual DOM in React?",
        answers: [
            { text: "A lightweight copy of the actual DOM", correct: true },
            { text: "A separate DOM for testing purposes", correct: false },
            { text: "A DOM element hidden from the user", correct: false },
            { text: "A DOM used only in server-side rendering", correct: false }
        ]
    },
    {
        question: "What is the purpose of keys in React lists?",
        answers: [
            { text: "To uniquely identify elements in a list", correct: true },
            { text: "To define the order of elements in a list", correct: false },
            { text: "To apply styles to list items", correct: false },
            { text: "To handle click events on list items", correct: false }
        ]
    },
    {
        question: "What is the role of ReactDOM in React?",
        answers: [
            { text: "To render React components in the DOM", correct: true },
            { text: "To manage component state", correct: false },
            { text: "To handle routing in React applications", correct: false },
            { text: "To fetch data from APIs", correct: false }
        ]
    },
    {
        question: "What are React hooks?",
        answers: [
            { text: "Functions that let you use state and other React features without writing a class", correct: true },
            { text: "Special components in React", correct: false },
            { text: "A way to define event handlers in React", correct: false },
            { text: "A type of routing mechanism in React", correct: false }
        ]
    },
    {
        question: "What is the purpose of useEffect() hook in React?",
        answers: [
            { text: "To perform side effects in function components", correct: true },
            { text: "To update component state", correct: false },
            { text: "To handle user input events", correct: false },
            { text: "To fetch data from an API", correct: false }
        ]
    },
    {
        question: "What is React Router?",
        answers: [
            { text: "A library for routing in React applications", correct: true },
            { text: "A built-in feature of React for handling routes", correct: false },
            { text: "A way to manage component state in React", correct: false },
            { text: "A tool for server-side rendering in React", correct: false }
        ]
    },
    {
        question: "What is the purpose of Redux in React applications?",
        answers: [
            { text: "To manage global state in complex applications", correct: true },
            { text: "To handle routing in React applications", correct: false },
            { text: "To define reusable components", correct: false },
            { text: "To optimize rendering performance", correct: false }
        ]
    },
    {
        question: "What are controlled components in React?",
        answers: [
            { text: "Components that store their own state internally", correct: false },
            { text: "Components that rely on external state management libraries", correct: false },
            { text: "Components where form data is handled by React", correct: true },
            { text: "Components that are rendered conditionally", correct: false }
        ]
    },
    {
        question: "What is the purpose of PropTypes in React?",
        answers: [
            { text: "To type-check the props passed to components", correct: true },
            { text: "To define the structure of component state", correct: false },
            { text: "To handle events in React components", correct: false },
            { text: "To fetch data from an API", correct: false }
        ]
    },
    {
        question: "What is the purpose of the context API in React?",
        answers: [
            { text: "To share data between components without passing props manually", correct: true },
            { text: "To define the layout structure of a React application", correct: false },
            { text: "To handle asynchronous operations in React components", correct: false },
            { text: "To optimize rendering performance", correct: false }
        ]
    },
    {
        question: "What is server-side rendering in React?",
        answers: [
            { text: "Rendering React components on the server and sending HTML to the client", correct: true },
            { text: "Rendering React components on the client-side only", correct: false },
            { text: "Rendering static HTML files from React components", correct: false },
            { text: "Rendering components asynchronously", correct: false }
        ]
    }
    // Add more questions here
];

const computerNetworkingQuestions = [
    {
        question: "What is TCP/IP?",
        answers: [
            { text: "Transport Control Protocol/Internet Protocol", correct: true },
            { text: "Transmission Control Protocol/Internet Protocol", correct: false },
            { text: "Two Concurrent Processes/Internet Protocol", correct: false },
            { text: "Transport Command Processor/Internet Protocol", correct: false }
        ]
    },
    {
        question: "What is the purpose of IP addresses in networking?",
        answers: [
            { text: "To identify devices on a network", correct: true },
            { text: "To encrypt network traffic", correct: false },
            { text: "To manage network hardware", correct: false },
            { text: "To authenticate users", correct: false }
        ]
    },
    {
        question: "What is a router in computer networking?",
        answers: [
            { text: "A device that forwards data packets between computer networks", correct: true },
            { text: "A device that converts digital signals to analog signals", correct: false },
            { text: "A device that connects devices within the same network", correct: false },
            { text: "A device that provides internet access to a single computer", correct: false }
        ]
    },
    {
        question: "What is a subnet mask?",
        answers: [
            { text: "A number that separates network and host portions of an IP address", correct: true },
            { text: "A device used to filter network traffic", correct: false },
            { text: "A protocol for securely transferring files over a network", correct: false },
            { text: "A technique for encrypting network communication", correct: false }
        ]
    },
    {
        question: "What is DNS in networking?",
        answers: [
            { text: "Domain Name System, a system that translates domain names to IP addresses", correct: true },
            { text: "Dynamic Network Services, a protocol for assigning IP addresses dynamically", correct: false },
            { text: "Digital Network Security, a framework for securing network communications", correct: false },
            { text: "Data Network Storage, a protocol for storing data on network servers", correct: false }
        ]
    },
    {
        question: "What is a firewall?",
        answers: [
            { text: "A security system that monitors and controls incoming and outgoing network traffic", correct: true },
            { text: "A device used to boost network performance", correct: false },
            { text: "A protocol for establishing secure connections over the internet", correct: false },
            { text: "A hardware component that connects multiple networks together", correct: false }
        ]
    },
    {
        question: "What is the purpose of NAT (Network Address Translation)?",
        answers: [
            { text: "To translate private IP addresses to public IP addresses", correct: true },
            { text: "To encrypt network traffic", correct: false },
            { text: "To authenticate users on a network", correct: false },
            { text: "To manage network hardware", correct: false }
        ]
    },
    {
        question: "What is a MAC address?",
        answers: [
            { text: "A unique identifier assigned to network interfaces for communications at the data link layer", correct: true },
            { text: "A protocol for routing data packets across networks", correct: false },
            { text: "A method for securing wireless networks", correct: false },
            { text: "A type of network cable", correct: false }
        ]
    },
    {
        question: "What is a switch in networking?",
        answers: [
            { text: "A device used to connect multiple devices within a single network", correct: true },
            { text: "A device used to connect multiple networks together", correct: false },
            { text: "A security system for protecting network traffic", correct: false },
            { text: "A protocol for transferring files over a network", correct: false }
        ]
    },
    {
        question: "What is the OSI model?",
        answers: [
            { text: "A conceptual model that standardizes the functions of a telecommunication or computing system", correct: true },
            { text: "A networking protocol for secure communication over the internet", correct: false },
            { text: "A hardware component for connecting multiple networks", correct: false },
            { text: "A method for allocating IP addresses dynamically", correct: false }
        ]
    },
    {
        question: "What is a VLAN (Virtual Local Area Network)?",
        answers: [
            { text: "A logical group of devices within the same broadcast domain", correct: true },
            { text: "A type of network cable", correct: false },
            { text: "A protocol for securing network communication", correct: false },
            { text: "A hardware device for connecting multiple networks", correct: false }
        ]
    },
    {
        question: "What is latency in networking?",
        answers: [
            { text: "The time it takes for data to travel from the source to the destination", correct: true },
            { text: "The amount of data that can be transmitted per unit of time", correct: false },
            { text: "The rate of errors in data transmission", correct: false },
            { text: "The distance between network devices", correct: false }
        ]
    },
    {
        question: "What is bandwidth in networking?",
        answers: [
            { text: "The maximum data transfer rate of a network or internet connection", correct: true },
            { text: "The physical size of a network", correct: false },
            { text: "The number of devices connected to a network", correct: false },
            { text: "The security level of a network", correct: false }
        ]
    },
    {
        question: "What is ARP (Address Resolution Protocol)?",
        answers: [
            { text: "A protocol used to map IP addresses to MAC addresses", correct: true },
            { text: "A security protocol for authenticating users on a network", correct: false },
            { text: "A routing protocol for directing data packets across networks", correct: false },
            { text: "A protocol for encrypting network traffic", correct: false }
        ]
    },
    {
        question: "What is a gateway in networking?",
        answers: [
            { text: "A device that connects two different networks", correct: true },
            { text: "A device that boosts network performance", correct: false },
            { text: "A security system for protecting network traffic", correct: false },
            { text: "A protocol for transferring files over a network", correct: false }
        ]
    },
    {
        question: "What is the purpose of ICMP (Internet Control Message Protocol)?",
        answers: [
            { text: "To send error messages and operational information indicating success or failure when communicating with another IP address", correct: true },
            { text: "To establish secure connections over the internet", correct: false },
            { text: "To manage network hardware", correct: false },
            { text: "To translate private IP addresses to public IP addresses", correct: false }
        ]
    }
    // Add more questions here
];

const osQuestions = [
    {
        question: "What is an operating system?",
        answers: [
            { text: "Software that manages computer hardware and software resources", correct: true },
            { text: "Software used only for hardware configuration", correct: false },
            { text: "A type of computer processor", correct: false },
            { text: "The physical components of a computer", correct: false }
        ]
    },
    {
        question: "What is multitasking in operating systems?",
        answers: [
            { text: "The ability of an operating system to execute multiple tasks concurrently", correct: true },
            { text: "The process of switching between different operating systems", correct: false },
            { text: "The use of multiple processors in a single computer", correct: false },
            { text: "The ability of an operating system to handle multiple users simultaneously", correct: false }
        ]
    },
    {
        question: "What is virtual memory?",
        answers: [
            { text: "A memory management technique that uses disk space to extend the RAM capacity", correct: true },
            { text: "A type of memory used exclusively for virtual machines", correct: false },
            { text: "A memory module used in cloud computing environments", correct: false },
            { text: "A type of memory that stores virtual addresses", correct: false }
        ]
    },
    {
        question: "What is a process in operating systems?",
        answers: [
            { text: "An instance of a program in execution", correct: true },
            { text: "A component of the operating system kernel", correct: false },
            { text: "A type of system call", correct: false },
            { text: "A hardware device used for input/output operations", correct: false }
        ]
    },
    {
        question: "What is a file system?",
        answers: [
            { text: "A method for storing and organizing data on storage devices", correct: true },
            { text: "A system for managing computer files and directories", correct: false },
            { text: "A protocol for transferring files over a network", correct: false },
            { text: "A system for tracking changes to files over time", correct: false }
        ]
    },
    {
        question: "What is a shell in operating systems?",
        answers: [
            { text: "A command-line interface for interacting with the operating system", correct: true },
            { text: "A protective barrier between the operating system and user applications", correct: false },
            { text: "A type of system call", correct: false },
            { text: "A hardware component responsible for memory management", correct: false }
        ]
    },
    {
        question: "What is a thread in operating systems?",
        answers: [
            { text: "A lightweight process that shares the same memory space as other threads", correct: true },
            { text: "A type of system call", correct: false },
            { text: "A method for transferring data between processes", correct: false },
            { text: "A hardware component used for parallel processing", correct: false }
        ]
    },
    {
        question: "What is deadlock in operating systems?",
        answers: [
            { text: "A situation where two or more processes are unable to proceed because each is waiting for the other to release a resource", correct: true },
            { text: "A type of system crash", correct: false },
            { text: "A security vulnerability in the operating system", correct: false },
            { text: "A method for resolving conflicts between processes", correct: false }
        ]
    },
    {
        question: "What is a semaphore in operating systems?",
        answers: [
            { text: "A synchronization primitive used to control access to shared resources", correct: true },
            { text: "A type of system call", correct: false },
            { text: "A hardware component for managing memory", correct: false },
            { text: "A protocol for communication between processes", correct: false }
        ]
    },
    {
        question: "What is paging in operating systems?",
        answers: [
            { text: "A memory management scheme that eliminates the need for contiguous allocation of physical memory", correct: true },
            { text: "A method for organizing files on a storage device", correct: false },
            { text: "A technique for transferring data between processes", correct: false },
            { text: "A protocol for routing data packets across networks", correct: false }
        ]
    },
    {
        question: "What is a device driver in operating systems?",
        answers: [
            { text: "A software component that enables communication between the operating system and hardware devices", correct: true },
            { text: "A hardware component responsible for memory management", correct: false },
            { text: "A type of system call", correct: false },
            { text: "A protocol for securing network communication", correct: false }
        ]
    },
    {
        question: "What is kernel in operating systems?",
        answers: [
            { text: "The core component of the operating system that manages system resources", correct: true },
            { text: "A type of file system", correct: false },
            { text: "A hardware component responsible for processing data", correct: false },
            { text: "A method for managing computer memory", correct: false }
        ]
    },
    {
        question: "What is a system call in operating systems?",
        answers: [
            { text: "A request made by a program to the operating system kernel for a service", correct: true },
            { text: "A method for organizing files on a storage device", correct: false },
            { text: "A protocol for securing network communication", correct: false },
            { text: "A method for resolving conflicts between processes", correct: false }
        ]
    },
    {
        question: "What is caching in operating systems?",
        answers: [
            { text: "A technique for storing frequently accessed data in a faster storage location", correct: true },
            { text: "A method for compressing files to save disk space", correct: false },
            { text: "A protocol for transferring files over a network", correct: false },
            { text: "A system for managing computer files and directories", correct: false }
        ]
    },
    {
        question: "What is scheduling in operating systems?",
        answers: [
            { text: "The process of determining which process to run next on the CPU", correct: true },
            { text: "A method for allocating memory to processes", correct: false },
            { text: "A technique for transferring data between processes", correct: false },
            { text: "A protocol for routing data packets across networks", correct: false }
        ]
    },
    {
        question: "What is an interrupt in operating systems?",
        answers: [
            { text: "A signal sent to the CPU to alert it of an event that needs immediate attention", correct: true },
            { text: "A method for handling errors in the operating system", correct: false },
            { text: "A hardware component responsible for processing data", correct: false },
            { text: "A type of system call", correct: false }
        ]
    }
];

const dsaQuestions = [
    {
        question: "What does FIFO stand for in data structures?",
        answers: [
            { text: "First In, Last Out", correct: false },
            { text: "First Input, First Output", correct: false },
            { text: "First In, First Out", correct: true },
            { text: "First Output, First In", correct: false }
        ]
    },
    {
        question: "What is a linked list?",
        answers: [
            { text: "A linear data structure where elements are stored in contiguous memory locations", correct: false },
            { text: "A data structure that consists of a sequence of elements where each element has a pointer to the next element", correct: true },
            { text: "A data structure that stores elements in key-value pairs", correct: false },
            { text: "A data structure that allows for constant-time access to elements", correct: false }
        ]
    },
    {
        question: "What is a stack?",
        answers: [
            { text: "A linear data structure where elements are stored in contiguous memory locations", correct: false },
            { text: "A data structure that consists of a sequence of elements where each element has a pointer to the next element", correct: false },
            { text: "A data structure that follows the Last In, First Out (LIFO) principle", correct: true },
            { text: "A data structure that allows for constant-time access to elements", correct: false }
        ]
    },
    {
        question: "What is a queue?",
        answers: [
            { text: "A linear data structure where elements are stored in contiguous memory locations", correct: false },
            { text: "A data structure that follows the First In, First Out (FIFO) principle", correct: true },
            { text: "A data structure that consists of a sequence of elements where each element has a pointer to the next element", correct: false },
            { text: "A data structure that allows for constant-time access to elements", correct: false }
        ]
    },
    {
        question: "What is a binary tree?",
        answers: [
            { text: "A tree data structure where each node can have at most two children", correct: true },
            { text: "A data structure that follows the Last In, First Out (LIFO) principle", correct: false },
            { text: "A data structure that allows for constant-time access to elements", correct: false },
            { text: "A data structure that consists of a sequence of elements where each element has a pointer to the next element", correct: false }
        ]
    },
    {
        question: "What is a hash table?",
        answers: [
            { text: "A data structure that follows the First In, First Out (FIFO) principle", correct: false },
            { text: "A data structure that consists of a sequence of elements where each element has a pointer to the next element", correct: false },
            { text: "A data structure that allows for constant-time access to elements", correct: false },
            { text: "A data structure that maps keys to values for efficient retrieval", correct: true }
        ]
    },
    {
        question: "What is the time complexity of inserting an element into a heap?",
        answers: [
            { text: "O(1)", correct: false },
            { text: "O(log n)", correct: true },
            { text: "O(n)", correct: false },
            { text: "O(n log n)", correct: false }
        ]
    },
    {
        question: "What is the difference between DFS and BFS?",
        answers: [
            { text: "DFS explores the deepest nodes first, while BFS explores the shallowest nodes first", correct: true },
            { text: "DFS uses a queue data structure, while BFS uses a stack data structure", correct: false },
            { text: "DFS guarantees the shortest path, while BFS does not", correct: false },
            { text: "DFS is more memory efficient than BFS", correct: false }
        ]
    },
    {
        question: "What is dynamic programming?",
        answers: [
            { text: "A programming paradigm that focuses on breaking down problems into smaller subproblems and solving each subproblem only once", correct: true },
            { text: "A programming technique for writing efficient code", correct: false },
            { text: "A programming language feature for dynamic memory allocation", correct: false },
            { text: "A type of programming error caused by memory leaks", correct: false }
        ]
    },
    {
        question: "What is a priority queue?",
        answers: [
            { text: "A queue data structure where elements are removed in the order they were added", correct: false },
            { text: "A queue data structure that allows for constant-time access to elements", correct: false },
            { text: "A queue data structure that removes the element with the highest priority first", correct: true },
            { text: "A queue data structure that follows the Last In, First Out (LIFO) principle", correct: false }
        ]
    },
    {
        question: "What is the time complexity of searching in a binary search tree?",
        answers: [
            { text: "O(1)", correct: false },
            { text: "O(log n)", correct: true },
            { text: "O(n)", correct: false },
            { text: "O(n log n)", correct: false }
        ]
    },
    {
        question: "What is an AVL tree?",
        answers: [
            { text: "A type of binary tree that guarantees the height difference between left and right subtrees is at most one", correct: true },
            { text: "A data structure for storing key-value pairs", correct: false },
            { text: "A tree data structure where each node can have at most two children", correct: false },
            { text: "A tree data structure that follows the First In, First Out (FIFO) principle", correct: false }
        ]
    },
    {
        question: "What is memoization?",
        answers: [
            { text: "A programming technique for storing the results of expensive function calls and returning the cached result when the same inputs occur again", correct: true },
            { text: "A programming paradigm that focuses on breaking down problems into smaller subproblems and solving each subproblem only once", correct: false },
            { text: "A type of programming error caused by memory leaks", correct: false },
            { text: "A method for optimizing recursion", correct: false }
        ]
    },
    {
        question: "What is the difference between a stack and a queue?",
        answers: [
            { text: "A stack follows the First In, First Out (FIFO) principle, while a queue follows the Last In, First Out (LIFO) principle", correct: false },
            { text: "A stack allows for constant-time access to elements, while a queue does not", correct: false },
            { text: "A stack allows for insertion and deletion of elements at both ends, while a queue only allows insertion at the front and deletion at the rear", correct: false },
           
        ]
    }
];

const oopsQuestions = [
    {
        question: "What is exception handling in programming?",
        answers: [
            { text: "A mechanism to handle errors that occur during program execution", correct: true },
            { text: "A way to ignore errors in a program", correct: false },
            { text: "A method to create intentional errors", correct: false },
            { text: "A tool to debug programs", correct: false }
        ]
    },
    {
        question: "What is inheritance in object-oriented programming?",
        answers: [
            { text: "A mechanism where a new class inherits properties and behaviors from an existing class", correct: true },
            { text: "A way to prevent a class from being inherited by other classes", correct: false },
            { text: "A method to create new instances of a class", correct: false },
            { text: "A technique to encapsulate data within a class", correct: false }
        ]
    },
    {
        question: "What is encapsulation in object-oriented programming?",
        answers: [
            { text: "The bundling of data and methods that operate on the data into a single unit or class", correct: true },
            { text: "The ability of a class to inherit properties and behaviors from another class", correct: false },
            { text: "The process of hiding the implementation details of a class", correct: false },
            { text: "The ability of a method to access and modify the data of an object", correct: false }
        ]
    },
    {
        question: "What is polymorphism in object-oriented programming?",
        answers: [
            { text: "The ability of a single function or method to operate on different types of data", correct: true },
            { text: "The process of creating multiple instances of a class", correct: false },
            { text: "The ability to access and modify the data of an object", correct: false },
            { text: "The process of hiding the implementation details of a class", correct: false }
        ]
    },
    {
        question: "What is a class in object-oriented programming?",
        answers: [
            { text: "A blueprint for creating objects that define their properties and behaviors", correct: true },
            { text: "A specific instance of a class", correct: false },
            { text: "A way to prevent a class from being inherited by other classes", correct: false },
            { text: "A mechanism to handle errors that occur during program execution", correct: false }
        ]
    },
    {
        question: "What is a constructor in object-oriented programming?",
        answers: [
            { text: "A special method used to initialize objects of a class", correct: true },
            { text: "A method that is automatically called when an object is destroyed", correct: false },
            { text: "A method that is used to destroy objects", correct: false },
            { text: "A method that is called when an object is instantiated", correct: false }
        ]
    },
    {
        question: "What is method overloading in object-oriented programming?",
        answers: [
            { text: "Defining multiple methods in a class with the same name but different parameters", correct: true },
            { text: "Calling a method from within another method of the same class", correct: false },
            { text: "Creating multiple instances of a class", correct: false },
            { text: "Hiding the implementation details of a class", correct: false }
        ]
    },
    {
        question: "What is method overriding in object-oriented programming?",
        answers: [
            { text: "Providing a new implementation for a method in a subclass that is already defined in its superclass", correct: true },
            { text: "Defining multiple methods in a class with the same name but different parameters", correct: false },
            { text: "Calling a method from within another method of the same class", correct: false },
            { text: "Creating multiple instances of a class", correct: false }
        ]
    },
    {
        question: "What is a superclass and subclass in object-oriented programming?",
        answers: [
            { text: "A superclass is a class that is inherited from, and a subclass is a class that inherits from another class", correct: true },
            { text: "A superclass is a class that inherits from another class, and a subclass is a class that is inherited from", correct: false },
            { text: "A superclass and subclass are two different names for the same concept", correct: false },
            { text: "A superclass is a class that has no subclasses, and a subclass is a class that has multiple superclasses", correct: false }
        ]
    },
    {
        question: "What is composition in object-oriented programming?",
        answers: [
            { text: "A design principle that favors building objects by combining simpler objects", correct: true },
            { text: "The process of creating multiple instances of a class", correct: false },
            { text: "The process of hiding the implementation details of a class", correct: false },
            { text: "A mechanism to handle errors that occur during program execution", correct: false }
        ]
    },
    {
        question: "What is aggregation in object-oriented programming?",
        answers: [
            { text: "A special type of association where objects have a 'has-a' relationship", correct: true },
            { text: "The process of creating multiple instances of a class", correct: false },
            { text: "The process of hiding the implementation details of a class", correct: false },
            { text: "A mechanism to handle errors that occur during program execution", correct: false }
        ]
    },
    {
        question: "What is the difference between composition and aggregation?",
        answers: [
            { text: "Composition implies a stronger relationship between objects, where the child object cannot exist independently of the parent object, while aggregation implies a weaker relationship, where the child object can exist independently", correct: true },
            { text: "Composition and aggregation are two different names for the same concept", correct: false },
            { text: "Composition and aggregation both imply a strong relationship between objects", correct: false },
            { text: "Composition and aggregation both imply a weak relationship between objects", correct: false }
        ]
    },
    {
        question: "What is the purpose of access modifiers in object-oriented programming?",
        answers: [
            { text: "To control the visibility and accessibility of class members", correct: true },
            { text: "To specify the number of objects that can be created from a class", correct: false },
            { text: "To provide a way to handle errors that occur during program execution", correct: false },
            { text: "To specify the superclass of a class", correct: false }
        ]
    },
    {
        question: "What is a static method in object-oriented programming?",
        answers: [
            { text: "A method that belongs to the class itself rather than to instances of the class", correct: true },
            { text: "A method that can only be called by other static methods", correct: false },
            { text: "A method that cannot access static variables of the class", correct: false },
            { text: "A method that can be overridden by subclasses", correct: false }
        ]
    },
    {
        question: "What is the difference between abstract classes and interfaces?",
        answers: [
            { text: "Abstract classes can have method implementations, while interfaces cannot", correct: true },
            { text: "Interfaces can have method implementations, while abstract classes cannot", correct: false },
            { text: "Abstract classes can extend multiple classes, while interfaces cannot", correct: false },
            { text: "Interfaces can extend multiple classes, while abstract classes cannot", correct: false }
        ]
    },
    {
        question: "What is the purpose of the 'final' keyword in object-oriented programming?",
        answers: [
            { text: "To prevent a class from being subclassed", correct: true },
            { text: "To prevent a method from being overridden", correct: false },
            { text: "To prevent a variable from being modified", correct: false },
            { text: "To prevent a class from being instantiated", correct: false }
        ]
    }
];


export  {computerNetworkingQuestions, reactQuestions, };