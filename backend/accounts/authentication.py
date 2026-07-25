from rest_framework.authentication import TokenAuthentication


class BearerTokenAuthentication(TokenAuthentication):
    """
    Accept the same CRM token sent as `Authorization: Bearer <key>`.

    DRF's built-in TokenAuthentication only recognises the keyword `Token`, but
    the near-universal convention for API clients — ChatGPT actions, Postman,
    most HTTP libraries — is `Bearer`. Registering this alongside the default
    lets an external integration authenticate with either keyword, so a service
    account's token works as a plain API key without any custom-header wiring.
    """

    keyword = "Bearer"
