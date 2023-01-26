Reconciling the design of contracts may be challenging for newcomers. Unlike other smart contract platforms, Cadence 
contracts are not static singletons whose functions your program flows through. Contracts resemble class definitions
in object-oriented programming languages. The entry point to contracts are mediated through Capabilities and program 
flow traverses through Resource instances created by contracts and which clients interact with. They observe the 
single-responsibility principle, and specify domain-driven interfaces based on Resources and other types. Resources 
defined in contracts internalize the most critical functionality and data for handling value and securing it. They
define roles and access, enforce rules and/or constraints, handle initialization, storing all object data 
on-chain transparently to builders. 

[Scripts and transactions](https://developers.flow.com/cadence/language/transactions) are the interface to
your off-chain application. Scripts provide read-only access to on-chain objects and can be run against specific 
blocks or the latest sealed block. They are useful for structuring raw data read from `borrowed` Resources to return
as program friendly data structures. 

Transactions have phases, are ACID, and mutate on-chain state across accounts when sealed. Their primary purpose is 
to orchestrate interactions between the parties to the transaction via functions exposed by Resources from the 
relevant contracts.

<Callout type="Avoid critical code in transactions">
Developers should take care not to code critical business logic, or other code that affects fundamental program flow,
within a transaction. Since transactions reside off-chain, others who see the transaction may craft a modified 
transaction which changes, or skips, certain logic compared to the original. If that logic is critical to the 
functioning of the program, or makes determinations about how or where value should be allocated it may leave open 
the possibility for an attacker to take advantage of this vulnerability. Always remember, smart contract engineering 
is also security engineering!
</Callout>

Helpful resources containing reference examples of contracts, scripts and transactions are listed below:

* [Fungible Token standard](https://github.com/onflow/flow-ft)
* [Non Fungible Token standard](https://github.com/onflow/flow-nft)
* [Flow Core Contracts](https://github.com/onflow/flow-core-contracts)
* [Cadence Cookbook](https://cookbook.onflow.org/) 