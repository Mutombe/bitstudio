from rest_framework.pagination import PageNumberPagination


class StandardPagination(PageNumberPagination):
    """
    Paginated by default. The Kanban board needs every card in a column at
    once, so it may raise the page size — but only up to a ceiling, so a
    stray `?page_size=100000` can't be used to haul the whole table.
    """

    page_size_query_param = "page_size"
    max_page_size = 500
