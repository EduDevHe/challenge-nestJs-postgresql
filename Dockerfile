FROM node:18

# Create app directory
WORKDIR /usr/src/app

COPY . .

COPY ./.env.production ./.env

# Install pnpm globally
RUN npm install -g pnpm

# Install application dependencies
RUN pnpm install

# Run Prisma migrations
RUN npx prisma migrate

RUN pnpm build

# Expose the port on which the app will run
EXPOSE 3000

# Start the server using the production build
CMD ["pnpm", "run", "start:prod"]

