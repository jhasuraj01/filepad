Clean Architecture is a software architecture pattern introduced by Robert C. Martin, also known as Uncle Bob. It is a way of designing software systems that emphasizes separation of concerns and independence of the implementation details of the components. The architecture is composed of several layers, which are:

1. **Domain Layer**: This layer contains the business logic and rules of the application. It is independent of any specific technology or implementation details. The Domain Layer can include components such as entities, use cases, and domain services.

2. **Application Layer**: This layer coordinates the interactions between the other layers. It contains the use cases of the application and uses the Domain Layer to implement them. The Application Layer can include components such as application services, command handlers, and query handlers.

3. **Presentation Layer**: This layer is responsible for handling user input and displaying the output. It interacts with the user interface and receives requests from the user. The Presentation Layer can include components such as controllers, views, and presenters.

4. **Infrastructure Layer**: This layer provides the necessary tools and resources to support the other layers. It includes components such as databases, web services, and file systems. The Infrastructure Layer is responsible for managing the communication between the system and external resources.