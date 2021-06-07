FROM mcr.microsoft.com/dotnet/sdk:5.0 AS builder
WORKDIR /build
RUN curl -sL https://deb.nodesource.com/setup_16.x |  bash -
RUN apt-get install -y nodejs
COPY . .
RUN dotnet test
RUN dotnet publish -o published

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS todo-list-app
WORKDIR /app
COPY --from=builder /build/published/ .
EXPOSE 80 
ENTRYPOINT ["dotnet", "todo-list.dll"]
