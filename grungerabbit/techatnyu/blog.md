---
layout: techatnyu
css: techatnyu.css
category: techatnyu
---
#Blog

{% for post in site.posts %}
{% if post.category == 'techatnyu' %}
<header>
	  <h2><a href="{{post.url}}">{{ post.title }}</a></h2>
	  <span>{{ post.date | date_to_long_string }}</span>
</header>
{{ post.content }}

{% endif %}
{% endfor %}