# Hudl Levels

Levels is Hudl's tool for sharing information related to the expectations of every role in the company, and how those expectations map to compensation levels. People Ops grades each role against a rubric, allowing for roles in departments across the company to be recognized equally. 

Levels is an extension of Snowflake. Snowflake is Medium's tool for planning and supporting our engineers' career development. You can read more
about how we use this tool in our [growth framework documentation](https://medium.com/s/engineering-growth-framework).
Our growth tool is hosted [publicly](https://snowflake.medium.com).

## Contributions

You are free to use, change and build on this work to make it useful for your organisation. We will happily consider
unencumbered code contributions to improve functionality, but as this is the actual tool we use within Medium, acceptance is likely to be intentional, and deliberate. Meaning, slow. As such, you may prefer to fork the codebase for your own needs. We will not accept any contributions that modify the text of the application (but, thank you in advance for pointing out any typos).

## Installation

Get yarn if you don’t have it already:

`npm install -g yarn`

Install dependencies:

`yarn`

### Running the dev server

`yarn dev`

### Building

`yarn export`

This will put a static version of the site in `out/`.

### Deployment

Levels is hosted statically on S3. To deploy a new version, simply upload the contents of `out/` into the bucket `levels.hudltools.com`. Make sure to make the contents publicly readable (this bucket is inside our internal VPC, so you can only access the contents on network).
