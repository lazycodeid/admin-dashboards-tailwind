```html
<div lazy-offcanvas="settings" lazy-offcanvas-scroll="true" class="_lazy-offcanvas">
</div>

<!-- lazy-offcanvas-scroll="false" --> <!-- default: false -->

<!-- 
    position: 'left', 'right', 'top', 'bottom'
    _lazy-offcanvas-content offcanvas-(left|right|top|bottom)

    .offcanvas-gradient
 -->

 <div lazy-offcanvas="settings" class="_lazy-offcanvas" aria-labelledby="slide-over-settings" role="dialog" aria-modal="true">
    <div class="_lazy-offcanvas-backdrop offcanvas-transparent"></div>
    <div class="_lazy-offcanvas-content offcanvas-gradient">
        <div class="_lazy-offcanvas-header">
            <h3 class="_lazy-offcanvas-title">Settings</h3>
            <button lazy-offcanvas-toggle="settings" class="btn-circle btn-md" lazy-icon="fa-duotone fa-xmark"></button>
        </div>
        <div class="_lazy-offcanvas-body">
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci vero tenetur iure commodi soluta perspiciatis mollitia, odit quam quo alias praesentium eaque ab rerum repellendus, dolor numquam, vel harum velit.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci vero tenetur iure commodi soluta perspiciatis mollitia, odit quam quo alias praesentium eaque ab rerum repellendus, dolor numquam, vel harum velit.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci vero tenetur iure commodi soluta perspiciatis mollitia, odit quam quo alias praesentium eaque ab rerum repellendus, dolor numquam, vel harum velit.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci vero tenetur iure commodi soluta perspiciatis mollitia, odit quam quo alias praesentium eaque ab rerum repellendus, dolor numquam, vel harum velit.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci vero tenetur iure commodi soluta perspiciatis mollitia, odit quam quo alias praesentium eaque ab rerum repellendus, dolor numquam, vel harum velit.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci vero tenetur iure commodi soluta perspiciatis mollitia, odit quam quo alias praesentium eaque ab rerum repellendus, dolor numquam, vel harum velit.</p>
        </div>
        <div class="_lazy-offcanvas-footer">
            footer
        </div>
    </div>
</div>
```

```js
// show offcanvas
// params: key, show = true or false
lazyOffCanvas("key", show = true)
```