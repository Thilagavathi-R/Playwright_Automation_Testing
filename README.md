# Playwright_Automation_Testing
Playwright, a cross-browser framework, provides end-to-end automated testing of web applications using the same API and runs frequent tests to ensure your web application is running as expected.

#1.Getting Started with Plawright

 # 1.1 What is Playwright and Advantages, Limitations
   * Playwright is an Open-source automation testing tool which is used test end to end modern web moblie application in headed or headless mode.

  # Advantages:
   * Cross Browser Testing - Chrome, Edge, Chromium, Firefox & Webkit.
   * Cross Platform Testing - Windows, Linux & MacOS.
   * Cross Programming Language - JavaScript, TS, Python, .NET & Java.
   * Mobile/Web - Mobile emulation of Google Chrome for Android and Mobile Safari.
   * Auto Wait
   * Tracing
   * Reporting
   * Dynamic Wait Assertions.
   * Faster & Reliable
   * Powerful Tooling - Codegen, Playwright Inspector & Trace Viewer
   * No flaky test
     
  # Disadvantages / Limitation
   * Playwright does not have a big community compared to selenium webdriver.
   * It does not work on legacy browsers such IE11.
   * Non-web applications: Playwright is specifically designed for web applications. For native desktop or native mobile application testing, other tools would be more suitable.

 #1.2 Playwright Architecture

  * Playwright is a framework for web testing and automation that uses a single API to test Chromium, Firefox, and WebKit. It supports cross-browser, cross-platform, and cross-language testing, and is aligned 
    with modern browser architecture.
  * The Playwright architecture uses a WebSocket connection to communicate all requests, which remains in place until test execution is complete. This reduces the number of points of failure and allows commands 
    to be sent quickly on a single connection. The client sends a WebSocket connection request to the server, and if the configurational parameters are correct, the connection is accepted. The server then 
    acknowledges the connection establishment to the client, and test execution begins on the same connection.
  * Playwright supports programming languages like JavaScript, Python, C#, and Java, though its main API was originally written in Node.js. It also supports all modern web features including network interception, 
    multiple browser contexts, and automatic waiting.
