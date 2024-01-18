```html
<!-- How To Use Lazy Collapse -->
<div class="_lazy-navcollapse">
    <div lazy-collapse-target="overview" class="_lazy-navcollapse-subheader">OVERVIEW</div>
    <div lazy-collapse="overview" class="_lazy-navcollapse-content is-active">
        <div class="w-full">
            CONTENT...
        </div>
    </div>
</div>

<!-- OR -->

<div lazy-collapse-init class="_lazy-navcollapse">
    <div lazy-collapse-toggle class="_lazy-navcollapse-subheader">OVERVIEW</div>
    <div lazy-collapse-content class="_lazy-navcollapse-content is-active">
        <div class="w-full">
            CONTENT...
        </div>
    </div>
</div>

```

```html
<!-- GLOBAL COLLAPSE -->

<button lazy-collapse-target="about">About Me</button>

....

<div lazy-collapse="about">
    <!-- CONTENT -->
</div>


<!-- STRICT COLLAPSE -->
<div lazy-collapse-init >
    <button lazy-collapse-toggle >About Me</button>
    <div lazy-collapse-content >
        <!-- CONTENT -->
    </div>
</div>
```