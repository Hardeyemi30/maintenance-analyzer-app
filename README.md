# maintenance-analyzer-app

# Building Maintenance Request Analyzer

## Project Overview

Building Maintenance Request Analyzer is a cloud-native web application that helps building managers and maintenance teams organize repair requests more efficiently.

Users can submit maintenance issues through a web form, upload photos of the problem, and receive an automatically categorized maintenance ticket. The system analyzes issue descriptions and classifies them into categories such as Plumbing, Electrical, HVAC, or General Maintenance.

The application demonstrates the use of Microsoft Azure cloud services, AI-powered text analysis, cloud storage, and NoSQL data storage.

---

## Features

### Current Features

* Submit maintenance requests
* Upload maintenance issue photos
* Generate maintenance tickets
* Automatic issue classification
* Key phrase extraction
* View ticket details after submission

### Maintenance Categories

* Plumbing
* Electrical
* HVAC
* General Maintenance

---

## Technology Stack

### Frontend

* Next.js 15
* TypeScript
* Tailwind CSS

### Backend

* Next.js API Routes

### Cloud Services

* Azure App Service
* Azure Blob Storage
* Azure Cosmos DB
* Azure AI Language Service

---

## Azure Services Used

### Azure App Service

Hosts the web application and API endpoints.

### Azure Blob Storage

Stores uploaded maintenance images.

Container:

```text
maintenance-images
```

### Azure Cosmos DB

Stores maintenance tickets and AI analysis results.

Database:

```text
MaintenanceDB
```

Container:

```text
Tickets
```

### Azure AI Language Service

Provides:

* Key phrase extraction
* Text analysis
* Maintenance request categorization support

---

## Application Workflow

```text
User Submits Request
        ↓
Upload Image
        ↓
Store Image in Azure Blob Storage
        ↓
Analyze Description
        ↓
Classify Maintenance Category
        ↓
Extract Key Phrases
        ↓
Save Ticket to Cosmos DB
        ↓
Display Ticket Results
```

---

## Project Structure

```text
src
│
├── app
│   ├── page.tsx
│   ├── submit
│   │   └── page.tsx
│   ├── ticket
│   │   └── page.tsx
│   └── api
│       ├── upload
│       │   └── route.ts
│       └── tickets
│           └── route.ts
│
├── lib
│   └── classifyIssue.ts
│
public
│
└── images
```

---

## Environment Variables

Create a file named:

```text
.env.local
```

Add the following variables:

```env
AZURE_STORAGE_CONNECTION_STRING=
COSMOS_ENDPOINT=
COSMOS_KEY=
LANGUAGE_ENDPOINT=
LANGUAGE_KEY=
```

Do not commit this file to GitHub.

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Move into the project:

```bash
cd building-maintenance-request-analyzer
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Required Packages

Install Azure packages:

```bash
npm install @azure/storage-blob
npm install @azure/cosmos
npm install @azure/ai-text-analytics
npm install uuid
```

---

## Running the Application

Start the development server:

```bash
npm run dev
```

Available pages:

### Home

```text
/
```

### Submit Request

```text
/submit
```

### Ticket Details

```text
/ticket
```

---

## Example Maintenance Requests

### Plumbing

```text
Water leaking under kitchen sink.
```

Expected Category:

```text
Plumbing
```

### HVAC

```text
The air conditioner stopped cooling.
```

Expected Category:

```text
HVAC
```

### Electrical

```text
Power outlet sparks when plugged in.
```

Expected Category:

```text
Electrical
```

### General

```text
Paint peeling from hallway wall.
```

Expected Category:

```text
General
```

---

## Responsible AI Considerations

### Fairness

Different users may describe the same issue differently. The application attempts to classify requests consistently, but wording can affect results.

### Reliability

Classification results may not always be accurate. Maintenance staff should review tickets before assigning work.

### Privacy

Users should not upload sensitive personal information. Only maintenance-related information should be submitted.

### Transparency

Users are informed that AI is assisting with issue categorization and analysis.

### Accountability

Final maintenance decisions remain the responsibility of maintenance personnel and building managers.

---

## Future Enhancements

### Agentic AI

Future versions may:

* Automatically assign maintenance staff
* Prioritize urgent repairs
* Recommend repair procedures
* Track maintenance completion
* Generate maintenance reports

### IoT Integration

Future versions may integrate with sensors that detect:

* Water leaks
* HVAC failures
* Electrical faults
* Temperature anomalies
* Energy consumption

Sensors could automatically create maintenance tickets without manual user input.

---

## Known Limitations

* Classification currently relies on keyword-based logic.
* Image analysis is not yet implemented.
* AI classification accuracy depends on the quality of user descriptions.
* Human review is recommended for all maintenance requests.

---

## Contributors

### Project Team

* Adeyemi Jaafar
* Bilal Berhane

---

## License

This project was developed for academic purposes as part of the INTP302 Cloud Computing and AI coursework.
