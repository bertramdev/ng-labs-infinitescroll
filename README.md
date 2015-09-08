# Infinite scrolling directive

## Usage

```
<ul infinite-scroll="page.loadMore()">
	<li ng-repeat="item in page.list">
		...
	</li>
</ul>
```

## Using a different container

One of `window`, `document` or a css selector:

```
<ul infinite-scroll="page.loadMore()" infinite-scroll-container="window">
	<li ng-repeat="item in page.list">
		...
	</li>
</ul>
```