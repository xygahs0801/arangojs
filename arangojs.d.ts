declare module "arangojs" {
    interface A {
        url: string;
        databaseName: string | boolean;
    }
    function arangojs(config: A | string): Database;
    export = arangojs;
    class Database {
        constructor(config?: any);
        /**
         * Updates the Database instance and its connection string to use
         * the given `databaseName`, then returns itself.
         *
         * @param databaseName The name of the database to use.
         */
        useDatabase(databaseName: string): any;
        useBasicAuth(username: string, password: string): void;
        useBearerAuth(token: string);
        /**
         * Creates a new database with the the given `databaseName`
         *
         * @param databaseName Name of the database to create
         * @param users (optional)
         */
        createDatabase(databaseName: string, users?: any[]): Promise<any>;
        /**
         * Fetches the database description for the active database from
         * the server
         */
        get(): Promise<any>;
        /**
         * Fetches all databases from the server and returns an array of
         * their names
         */
        listDatabases(): Promise<string[]>;
        /**
         * Fetches all databases accessible to the active user from the
         * server and returns an array of their names
         */
        listUserDatabases(): Promise<string[]>;
        /**
         * Deletes the database with the given `databaseName` from the server
         */
        dropDatabase(databaseName: string): Promise<any>;
        /**
         * Deletes all documents in all collections in the active database
         *
         * @param excludeSystem (Default: `true`) Whether system collections should be excluded
         */
        truncate(excludeSystem?: boolean): Promise<any>;
        /**
         * Returns a `DocumentCollection` instance for the given collection name
         *
         * @param collectionName Name of the document collection
         */
        collection(collectionName: string): DocumentCollection;
        /**
         * Returns an `EdgeCollection` instance for the given collection name
         *
         * @param collectionName Name of the edge collection
         */
        edgeCollection(collectionName: string): EdgeCollection;
        /**
         * Fetches all collections from the database and returns an array of collection descriptions
         *
         * @param excludeSystem (Default: `true`) Whether system collections should be excluded from the results
         */
        listCollections(excludeSystem?: boolean): Promise<any[]>;
        /**
         * Fetches all collections from the database and returns an array of `DocumentCollection` and `EdgeCollection` instances for the collections.
         *
         * @param excludeSystem (Default: `true`) Whether system collections should be excluded from the results
         */
        collections(excludeSystem?: boolean): Promise<Collection[]>;
        /**
         * Returns a `Graph` instance representing the graph with the given graph name
         */
        graph(graphName: string): Graph;
        /**
         * Fetches all graphs from the database and returns an array of graph descriptions
         */
        listGraphs(): Promise<any[]>;
        /**
         * Fetches all graphs from the database and returns an array of `Graph` instances for the graphs
         */
        graphs(): Promise<Graph[]>;
        /**
         * Performs a server-side transaction and returns its return value.
         *
         * If `collections` is an array or string, it will be treated as `collections.write`.
         *
         * @param collections An object with arrays of names (or single name) of collections that will be read/written during the transaction.
         * @param action A string evaluating to a JavaScript function to be executed on the server
         * @param params Available as variable `params` when the `action` function is being executed on server.
         * @param lockTimeout Determines how long the database will wait while attemping to gain locks on collections used by the transaction before timing out
         */
        transaction(collections: {
            read?: string | string[],
            write?: string | string[]
        } | string | string[], action: string, params?: any, lockTimeout?: number): Promise<any>;
        /**
         * Performs a database query using the given `query` and `bindVars`, then returns a new `Cursor` instance for the result list
         *
         * @param query An AQL query string or a query builder instance
         * @param bindVars An object defining the variables to bind the query to
         * @param opts Additional options that will be passed to the query API
         */
        query(query: string, bindVars?: any, opts?: any): Promise<Cursor>;
        /**
         * Template string handler for AQL queries. Converts an ES2015 template string to an object that can be passed to `database.query` by converting arguments to bind variables
         *
         * Any Collection instances will automatically be converted to collection bind variables
         */
        aqlQuery(strings: string[], ...args: any[]): Promise<Cursor>;
        /**
         * Fetches a list of all AQL user functions registered with the database
         */
        listFunctions(): Promise<any[]>;
        /**
         * Creates an AQL user function with the given name and code if it does not already exist or replaces it if a function with the same name already existed
         *
         * @param name A valid AQL function name, e.g. `myfuncs::accounting::calculate_vat`
         * @param code A string evaluating to a JavaScript function (not a JavaScript function object)
         */
        createFunction(name: string, code: string): any;
        /**
         * Deletes the AQL user function with the given name from the database
         *
         * @param name The name of the user function to drop
         * @param group (Default: `false`) If set to `true` all functions with a name starting with name will be deleted; otherwise only the function with the exact name will be deleted
         */
        dropFunction(name: string, group?: boolean): Promise<any>;
        /**
         * Returns a new Route instance for the given path (relative to the database) that can be used to perform arbitrary HTTP requests
         *
         * @param path The database-relative URL of the route
         * @param headers Default headers that should be sent with each request to the route
         */
        route(path?: string, headers?: any): Promise<Route>;
    }

    class Collection {
        /**
         * Retrieves general information about the collection
         */
        get(): Promise<any>;
        /**
         * Retrieves the collection's properties
         */
        properties(): Promise<any>;
        /**
         * Retrieves information about the number of documents in a collection
         */
        count(): Promise<any>;
        /**
         * Retrieves statistics for a collection
         */
        figures(): Promise<any>;
        /**
         * Retrieves the collection revision ID
         */
        revision(): Promise<any>;
        /**
         * Retrieves the collection checksum
         */
        checksum(opts?: any): Promise<any>;
        /**
         * Creates a collection with the given properties for this collection's name, then returns the server response
         */
        create(properties: any): Promise<any>;
        /**
         * Tells the server to load the collection into memory
         *
         * @param count If set to false, the return value will not include the number of documents in the collection (which may speed up the process)
         */
        load(count: boolean): Promise<any>;
        /**
         * Tells the server to remove the collection from memory
         */
        unload(): Promise<any>;
        /**
         * Replaces the properties of the collection
         */
        setProperties(properties: any): Promise<any>;
        /**
         * Renames the collection. The Collection instance will automatically update its name when the rename succeeds
         */
        rename(name: string): Promise<any>;
        /**
         * Rotates the journal of the collection
         */
        rotate(): Promise<any>;
        /**
         * Deletes all documents in the collection in the database
         */
        truncate(): Promise<any>;
        /**
         * Deletes the collection from the database
         */
        drop(): Promise<any>;
        /**
         * Creates an arbitrary index on the collection
         */
        createIndex(details: any): any;
        /**
         * Creates a cap constraint index on the collection
         *
         * @param size
         */
        createCapConstraint(size: any): Promise<any>;
        /**
         * Creates a hash index on the collection
         *
         * @param fields An array of names of document fields on which to create the index. If the value is a string, it will be wrapped in an array automatically.
         * @param opts Additional options for this index. If the value is a boolean, it will be interpreted as opts.unique
         */
        createHashIndex(fields: string[], opts?: any): Promise<any>;
        /**
         * Creates a skiplist index on the collection
         *
         * @param fields An array of names of document fields on which to create the index. If the value is a string, it will be wrapped in an array automatically.
         * @param opts Additional options for this index. If the value is a boolean, it will be interpreted as opts.unique
         */
        createSkipList(fields: string[], opts?: any): Promise<any>;
        /**
         * Creates a geo-spatial index on the collection
         *
         * @param fields An array of names of document fields on which to create the index. Currently, geo indices must cover exactly one field. If the value is a string, it will be wrapped in an array automatically.
         * @param opts Additional options for this index. If the value is a boolean, it will be interpreted as opts.unique
         */
        createGeoIndex(fields: string[], opts?: any): Promise<any>;
        /**
         * Creates a hash index on the collection
         *
         * @param fields An array of names of document fields on which to create the index. Currently, full-text indices must cover exactly one field. If the value is a string, it will be wrapped in an array automatically.
         * @param minLength Minimum character length of words to index. Uses a server-specific default value if not specified
         */
        createFulltextIndex(fields: string[], minLength?: number): Promise<any>;
        /**
         * Fetches information about the index with the given indexHandle and returns it
         *
         * @param indexHandle The handle of the index to look up. This can either be a fully-qualified identifier or the collection-specific key of the index. If the value is an object, its id property will be used instead.
         */
        index(indexHandle: string): Promise<any>;
        /**
         * Fetches a list of all indexes on this collection
         */
        indexes(): Promise<any[]>;
        /**
         * Deletes the index with the given indexHandle from the collection
         *
         * @param indexHandle The handle of the index to delete. This can either be a fully-qualified identifier or the collection-specific key of the index. If the value is an object, its id property will be used instead.
         */
        dropIndex(indexHandle: string): Promise<any>;
        /**
         * Performs a query to fetch all documents in the collection. Returns a new Cursor instance for the query results.
         */
        all(opts?: any): Promise<Cursor>;
        /**
         * Fetches a document from the collection at random
         */
        any(): Promise<any>;
        /**
         * Performs a query to fetch the first documents in the collection. Returns an array of the matching documents.
         */
        first(opts?: any): Promise<any[]>;
        /**
         * Performs a query to fetch the last documents in the collection. Returns an array of the matching documents.
         */
        last(opts?: any): Promise<any[]>;
        /**
         * Performs a query to fetch all documents in the collection matching the given example. Returns a new Cursor instance for the query results.
         *
         * @param example An object representing an example for documents to be matched against
         * @param opts
         */
        byExample(example: any, opts?: any): Promise<Cursor>;
        /** Fetches the first document in the collection matching the given example
         *
         * @param example An object representing an example for documents to be matched against
         */
        firstExample(example: any): Promise<any>;
        /**
         * Removes all documents in the collection matching the given example
         *
         * @param example An object representing an example for documents to be matched against
         * @param opts
         */
        removeByExample(example: any, opts?: any): Promise<any>;
        /**
         * Replaces all documents in the collection matching the given example with the given newValue
         *
         * @param example An object representing an example for documents to be matched against
         * @param newValue The new value to update matching documents with
         * @param opts
         */
        replaceByExample(example: any, newValue: any, opts?: any): Promise<any>;
        /**
         * Updates (patches) all documents in the collection matching the given example with the given newValue
         *
         * @param example An object representing an example for documents to be matched against
         * @param newValue The new value to update matching documents with
         * @param opts
         */
        updateByExample(example: any, newValue: any, opts?: any): Promise<any>;
        /**
         * Fetches the documents with the given keys from the collection. Returns an array of the matching documents
         *
         * @param keys An array of document keys to look up
         */
        lookupByKeys(keys: any[]): Promise<any[]>;
        /**
         * Deletes the documents with the given keys from the collection
         *
         * @param keys An array of document keys to delete
         * @param opts
         */
        removeByKeys(keys: any[], opts?: any): Promise<any[]>;
        /**
         * Performs a fulltext query in the given fieldName on the collection
         *
         * @param fieldName Name of the field to search on documents in the collection
         * @param query Fulltext query string to search for
         * @param opts
         */
        fulltext(fieldName: string, query: string, opts?: any): Promise<Cursor>;
        /**
         * Bulk imports the given data into the collection
         *
         * @param data The data to import. This can be an array of documents, or it can be an array of value arrays following an array of keys
         * @param opts
         */
        import(data: any[][] | any[], opts?: any): Promise<any>;
        /**
         * Replaces the content of the document with the given documentHandle with the given newValue and returns an object containing the document's metadata
         *
         * @param documentHandle The handle of the document to retrieve. This can be either the `_id` or the `_key` of a document in the collection, or a document (i.e. an object with an `_id` or `_key` property)
         * @param newValue The new data of the document
         * @param opts
         */
        replace(documentHandle: string, newValue: any, opts?: any): Promise<any>;
        /**
         * Updates (merges) the content of the document with the given documentHandle with the given newValue and returns an object containing the document's metadata
         * @param documentHandle The handle of the document to retrieve. This can be either the `_id` or the `_key` of a document in the collection, or a document (i.e. an object with an `_id` or `_key` property)
         * @param newValue The new data of the document
         * @param opts
         */
        update(documentHandle: string, newValue: any, opts?: any): Promise<any>;
        /**
         * Deletes the document with the given documentHandle from the collection
         * @param documentHandle The handle of the document to retrieve. This can be either the `_id` or the `_key` of a document in the collection, or a document (i.e. an object with an `_id` or `_key` property)
         */
        remove(documentHandle: string, opts?: any): Promise<any>;
        /**
         * Retrieves a list of references for all documents in the collection
         * @param type The format of the document references - one of "id", "key" or "path"
         */
        list(type?: string): Promise<string[]>;
    }

    class DocumentCollection extends Collection {
        /**
         * Retrieves the document with the given documentHandle from the collection
         * @param documentHandle The handle of the document to retrieve. This can be either the `_id` or the `_key` of a document in the collection, or a document (i.e. an object with an `_id` or `_key` property)
         */
        document(documentHandle: string): Promise<any>;
        /**
         * Creates a new document with the given data and returns an object containing the document's metadata
         * @param data The data of the new document, may include a `_key`
         */
        save(data: any, opts?: any): Promise<any>;
    }

    class EdgeCollection extends Collection {
        /**
         * Retrieves the edge with the given documentHandle from the collection
         *
         * @param documentHandle The handle of the edge to retrieve. This can be either the `_id` or the `_key` of a document in the collection, or a document (i.e. an object with an `_id` or `_key` property)
         */
        edge(documentHandle: string): Promise<any>;
        /**
         * Creates a new edge between the documents fromId and toId with the given data and returns an object containing the edge's metadata
         *
         * @param data The data of the new edge. If fromId and toId are not specified, the data needs to contain the properties _from and _to
         * @param fromId The handle of the start vertex of this edge. This can be either the  _id  of a document in the database, the  _key  of an edge in the collection, or a document (i.e. an object with an  _id  or  _key  property)
         * @param toId The handle of the end vertex of this edge. This can be either the  _id  of a document in the database, the  _key  of an edge in the collection, or a document (i.e. an object with an  _id  or  _key  property)
         */
        save(data: string, fromId?: string, toId?: string): Promise<any>;
        /**
         * Retrieves a list of all edges of the document with the given documentHandle
         *
         * @param documentHandle The handle of the document to retrieve the edges of. This can be either the  _id  of a document in the database, the  _key  of an edge in the collection, or a document (i.e. an object with an  _id  or  _key  property)
         */
        edges(documentHandle: string): Promise<any[]>;
        /**
         * Retrieves a list of all incoming edges of the document with the given documentHandle
         *
         * @param documentHandle The handle of the document to retrieve the edges of. This can be either the  _id  of a document in the database, the  _key  of an edge in the collection, or a document (i.e. an object with an  _id  or  _key  property)
         */
        inEdges(documentHandle: string): Promise<any[]>;
        /**
         * Retrieves a list of all outgoing edges of the document with the given documentHandle
         *
         * @param documentHandle The handle of the document to retrieve the edges of. This can be either the  _id  of a document in the database, the  _key  of an edge in the collection, or a document (i.e. an object with an  _id  or  _key  property)
         */
        outEdges(documentHandle: string): Promise<any[]>;
        /**
         * Performs a traversal starting from the given startVertex and following edges contained in this edge collection
         *
         * @param startVertex The handle of the start vertex. This can be either the  _id  of a document in the database, the  _key  of an edge in the collection, or a document (i.e. an object with an  _id  or  _key  property)
         * @param opts
         */
        traversal(startVertex: string, opts: any): any;
    }

    class Cursor {
        /**
         * The total number of documents in the query result. This is only available if the count option was used
         */
        count: number;
        /**
         * Exhausts the cursor, then returns an array containing all values in the cursor's remaining result list
         */
        all(): Promise<any[]>;
        /**
         * Advances the cursor and returns the next value in the cursor's remaining result list. If the cursor has already been exhausted, returns `undefined` instead.
         */
        next(): Promise<any>;
        /**
         * Returns `true` if the cursor has more values or `false` if the cursor has been exhausted.
         */
        hasNext(): boolean;
        /**
         * Advances the cursor by applying the function fn to each value in the cursor's remaining result list until the cursor is exhausted or fn explicitly returns `false`.
         *
         * Returns the last return value of fn.
         * Equivalent to Array.prototype.forEach (except async).
         *
         * @param fn A function that will be invoked for each value in the cursor's remaining result list until it explicitly returns `false` or the cursor is exhausted
         */
        each(callback: (value: any, index: number, cursor: Cursor) => any): Promise<any>;
        /**
         * Advances the cursor by applying the function fn to each value in the cursor's remaining result list until the cursor is exhausted or fn returns a value that evaluates to `false`.
         *
         * Returns `false` if fn returned a value that evalutes to  `false`, or `true` otherwise.
         *
         * Equivalent to Array.prototype.every (except async).
         */
        every(callback: (value: any, index: number, cursor: Cursor) => any): Promise<boolean>;
        /**
         * Advances the cursor by applying the function fn to each value in the cursor's remaining result list until the cursor is exhausted or fn returns a value that evaluates to `true`.
         *
         * Returns `true` if fn returned a value that evalutes to `true`, or `false` otherwise.
         *
         * Equivalent to Array.prototype.some (except async).
         */
        some(callback: (value: any, index: number, cursor: Cursor) => any): Promise<boolean>;
        /**
         * Advances the cursor by applying the function fn to each value in the cursor's remaining result list until the cursor is exhausted.
         *
         * Returns an array of the return values of fn.
         *
         * Equivalent to Array.prototype.map (except async).
         */
        map(callback: (value: any, index: number, cursor: Cursor) => any): Promise<any[]>;
        /**
         * Exhausts the cursor by reducing the values in the cursor's remaining result list with the given function fn. If accu is not provided, the first value in the cursor's remaining result list will be used instead (the function will not be invoked for that value).
         *
         * Equivalent to Array.prototype.reduce (except async).
         */
        reduce(callback: (value: any, index: number, cursor: Cursor) => any, accu?: any): Promise<any>;
    }

    class Route {
        /**
         * Returns a new Route instance for the given path (relative to the current route) that can be used to perform arbitrary HTTP requests
         *
         * @param path The relative URL of the route
         * @param headers Deafult headers that should be sent with each request to the route
         */
        route(path?: string, headers?: any): Route;
        /**
         * Performs a GET request to the given URL and returns the server response
         *
         * @param path The route-relative URL for the request. If omitted, the request will be made to the base URL of the route
         * @param qs The query string for the request. If qs is an object, it will be translated to a query string
         */
        get(path?: string, qs?: string): Promise<any>;
        /**
         * Performs a POST request to the given URL and returns the server response
         *
         * @param path The route-relative URL for the request. If omitted, the request will be made to the base URL of the route
         * @param body The response body. If body is an object, it will be encoded as JSON.
         * @param qs The query string for the request. If qs is an object, it will be translated to a query string
         */
        post(path?: string, body?: string, qs?: string): Promise<any>;
        /**
         * Performs a PUT request to the given URL and returns the server response
         *
         * @param path The route-relative URL for the request. If omitted, the request will be made to the base URL of the route
         * @param body The response body. If body is an object, it will be encoded as JSON.
         * @param qs The query string for the request. If qs is an object, it will be translated to a query string
         */
        put(path?: string, body?: string, qs?: string): Promise<any>;
        /**
         * Performs a PATCH request to the given URL and returns the server response
         *
         * @param path The route-relative URL for the request. If omitted, the request will be made to the base URL of the route
         * @param body The response body. If body is an object, it will be encoded as JSON.
         * @param qs The query string for the request. If qs is an object, it will be translated to a query string
         */
        patch(path?: string, body?: string, qs?: string): Promise<any>;
        /**
         * Performs a DELETE request to the given URL and returns the server response
         *
         * @param path The route-relative URL for the request. If omitted, the request will be made to the base URL of the route
         * @param qs The query string for the request. If qs is an object, it will be translated to a query string
         */
        delete(path?: string, qs?: string): Promise<any>;
        /**
         * Performs a HEAD request to the given URL and returns the server response
         *
         * @param path The route-relative URL for the request. If omitted, the request will be made to the base URL of the route
         * @param qs The query string for the request. If qs is an object, it will be translated to a query string
         */
        head(path?: string, qs?: string): Promise<any>;
        /**
         * Performs an arbitrary request to the given URL and returns the server response.
         *
         * @params opts
         */
        request(opts?: any): Promise<any>;
    }

    class Graph {
        /**
         * Retrieves general information about the graph
         */
        get(): Promise<any>;
        /**
         * Creates a graph with the given properties for this graph's name, then returns the server response
         *
         * @param properties
         */
        create(properties: any): Promise<any>;
        /**
         * Deletes the graph from the database
         *
         * @param dropCollections If set to `true`, the collections associated with the graph will also be deleted
         */
        drop(dropCollections?: boolean): Promise<any>;
        /**
         * Returns a new GraphVertexCollection instance with the given name for this graph
         *
         * @param collectionName Name of the vertex collection
         */
        vertexCollection(collectionName: string): GraphVertexCollection;
        /**
         * Adds the collection with the given collectionName to the graph's vertex collections
         *
         * @param collectionName Name of the vertex collection to add to the graph
         */
        addVertexCollection(collectionName: string): Promise<any>;
        /**
         * Removes the vertex collection with the given collectionName from the graph
         *
         * @param collectionName Name of the vertex collection to remove from the graph
         * @param dropCollection If set to true, the collection will also be deleted from the database
         */
        removeVertexCollection(collectionName: string, dropCollection?: boolean): Promise<any>;
        /**
         * Returns a new GraphEdgeCollection instance with the given name bound to this graph
         *
         * @param collectionName Name of the edge collection
         */
        edgeCollection(collectionName: string): GraphEdgeCollection;
        /**
         * Adds the given edge definition to the graph
         *
         * @param definition
         */
        addEdgeDefinition(definition: any): Promise<any>;
        /**
         * Replaces the edge definition for the edge collection named collectionName with the given definition
         *
         * @param collectionName Name of the edge collection to replace the definition of
         * @param definition
         */
        replaceEdgeDefinition(collectionName: string, definition: any): Promise<any>;
        /**
         * Removes the edge definition with the given definitionName form the graph
         *
         * @param definitionName Name of the edge definition to remove from the graph
         * @param dropCollection If set to  true , the edge collection associated with the definition will also be deleted from the database
         */
        removeEdgeDefinition(definitionName: string, dropCollection?: boolean): Promise<any>;
        /**
         * Performs a traversal starting from the given startVertex and following edges contained in any of the edge collections in this graph
         *
         * @param startVertex The handle of the start vertex. This can be either the  _id  of a document in the graph or a document (i.e. an object with an  _id  or  _key  property)
         * @param opts
         */
        traversal(startVertex: string, opts: any): Promise<any>;
    }

    class GraphVertexCollection extends Collection {
        /**
         * Deletes the vertex with the given documentHandle from the collection.
         * @param documentHandle The handle of the vertex to retrieve. This can be either the _id or the _key of a vertex in the collection, or a vertex (i.e.an object with an _id or _key property).
         */
        remove(documentHandle: string): Promise<any>;
        /**
         * Retrieves the vertex with the given documentHandle from the collection.
         * @param documentHandle The handle of the vertex to retrieve. This can be either the _id or the _key of a vertex in the collection, or a vertex (i.e.an object with an _id or _key property).
         */
        vertex(documentHandle: string): Promise<any>;
        /**
         * Creates a new vertex with the given data.
         * @param data The data of the vertex
         */
        save(data: any): Promise<any>;
    }

    class GraphEdgeCollection extends Collection {
        /**
         * Deletes the edge with the given documentHandle from the collection.
         * @param documentHandle The handle of the vertex to retrieve. This can be either the _id or the _key of a vertex in the collection, or a vertex (i.e.an object with an _id or _key property).
         */
        remove(documentHandle: string): Promise<any>;
        /**
         * Retrieves the edge with the given documentHandle from the collection.
         * @param documentHandle The handle of the vertex to retrieve. This can be either the _id or the _key of a vertex in the collection, or a vertex (i.e.an object with an _id or _key property).
         */
        edge(documentHandle: string): Promise<any>;
        /**
         * Creates a new edge between the vertices fromId and toId with the given data.
         * @param data The data of the new edge. If fromId and toId are not specified, the data needs to contain the properties _from and _to.
         * @param fromId The handle of the start vertex of this edge. This can be either the  _id  of a document in the database, the  _key  of an edge in the collection, or a document (i.e. an object with an  _id  or  _key  property).
         * @param toID The handle of the end vertex of this edge. This can be either the  _id  of a document in the database, the  _key  of an edge in the collection, or a document (i.e. an object with an  _id  or  _key  property).
         */
        save(data: any, fromId?: string, toId?: string): Promise<any>;
        /**
         * Retrieves a list of all edges of the document with the given documentHandle.
         * @param documentHandle The handle of the document to retrieve the edges of. This can be either the  _id  of a document in the database, the  _key  of an edge in the collection, or a document (i.e. an

         with an  _id  or  _key  property).
         */
        edges(documentHandle: string): Promise<Array<any>>;
        /**
         * Retrieves a list of all incoming edges of the document with the given documentHandle.
         * @param documentHandle The handle of the document to retrieve the edges of. This can be either the  _id  of a document in the database, the  _key  of an edge in the collection, or a document (i.e. an object with an  _id  or  _key  property).
         */
        inEdges(documentHandle: string): Promise<Array<any>>;
        /**
         * Retrieves a list of all outgoing edges of the document with the given documentHandle.
         * @param documentHandle The handle of the document to retrieve the edges of. This can be either the  _id  of a document in the database, the  _key  of an edge in the collection, or a document (i.e. an object with an  _id  or  _key  property).
         */
        inEdges(documentHandle: string): Promise<Array<any>>;
        /**
         * Performs a traversal starting from the given startVertex and following edges contained in this edge collection.
         * @param startVertex The handle of the start vertex. This can be either the  _id  of a document in the database, the  _key  of an edge in the collection, or a document (i.e. an object with an  _id  or  _key  property).
         * @param opts
         */
        traversal(startVertex: string, opts: any): Promise<any>;
    }
}
