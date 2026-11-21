# Run Instructions (assumed MacOS)

## Terminal 1 (Backend):
lsof -ti:8080 | xargs kill -9 2>/dev/null
./mvnw spring-boot:run

## Terminal 2 (Frontend):
cd frontend
lsof -ti:3000,5173 | xargs kill -9 2>/dev/null
npm run dev -- -p 3000