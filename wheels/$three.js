let $three = {
    initThree: function ({
                             canvasID = 'threejs-output',
                             canvasWidth = window.innerWidth,   //渲染处宽，默认全屏
                             canvasHeight = window.innerHeight, //渲染处高，默认全屏
                             cameraNear = 0.1,
                             cameraFar = 1000,
                             cameraX = 30,
                             cameraY = 30,
                             cameraZ = 30,
                             axesSize = 20 //是否添加辅助轴
                         } = {}) {

        let threeConf = {
            renderer: null,
            camera: null,
            scene: null,
            control: null, //常用OrbitControls
            stats: null
        };
        //渲染器
        threeConf.renderer = new THREE.WebGLRenderer({
            antialias: true, //是否开启抗锯齿
            // alpha:true //是否开启alphaBuffer，执行透明和半透明操作
        });
        threeConf.renderer.setSize(canvasWidth, canvasHeight);//渲染器尺寸
        document.getElementById(canvasID).appendChild(threeConf.renderer.domElement);//内容都画在domelement上
        threeConf.renderer.setClearColor(0x000000, 1.0);//设置缓冲区颜色

        //    场景
        threeConf.scene = new THREE.Scene();

        //    摄像头
        threeConf.camera = new THREE.PerspectiveCamera(60, canvasWidth / canvasHeight, cameraNear, cameraFar);
        threeConf.camera.position.x = cameraX;
        threeConf.camera.position.y = cameraY;
        threeConf.camera.position.z = cameraZ;
        threeConf.camera.up.x = 0;
        threeConf.camera.up.y = 1;
        threeConf.camera.up.z = 0;
        threeConf.camera.lookAt(0, 0, 0);

        //    控制器
        threeConf.control = new THREE.OrbitControls(threeConf.camera);

        //    监视器
        threeConf.stats = new Stats();
        threeConf.stats.domElement.style.position = "fixed";
        threeConf.stats.domElement.style.left = "0px";
        threeConf.stats.domElement.style.top = "0px";
        document.getElementById(canvasID).appendChild(threeConf.stats.dom);

        if(axesSize > 0){
            let axes = new THREE.AxisHelper(axesSize);
            console.log(axes);
            threeConf.scene.add(axes);
        }



        return threeConf;

    },

    initTest: function (threeConf) {
        let cubeGeometry = new THREE.CubeGeometry(10, 10, 10);
        let cubeMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
        let cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
        threeConf.scene.add(cubeMesh);
        this.initRender(cubeMesh);
    },

    initRender: function (cubeMesh) {
        threeConf.stats.update();
        requestAnimationFrame(
            () => {
                this.initRender(cubeMesh);
            }
        );
        // cubeMesh.rotation.x += 0.1;
        cubeMesh.rotation.y += 0.1;
        threeConf.renderer.render(threeConf.scene, threeConf.camera)
    },
};



// function initThree({
//                        canvasID = 'threejs-output',
//                        canvasWidth = window.innerWidth,   //渲染处宽，默认全屏
//                        canvasHeight = window.innerHeight, //渲染处高，默认全屏
//                        cameraNear = 0.1,
//                        cameraFar = 1000,
//                        cameraX = 30,
//                        cameraY = 30,
//                        cameraZ = 30,
//                    } = {}) {
//     let threeConf = {
//         renderer: null,
//         camera: null,
//         scene: null,
//         control: null, //常用OrbitControls
//         stats: null
//     };
//     //渲染器
//     threeConf.renderer = new THREE.WebGLRenderer({
//         antialias: true, //是否开启抗锯齿
//         // alpha:true //是否开启alphaBuffer，执行透明和半透明操作
//     });
//     threeConf.renderer.setSize(canvasWidth, canvasHeight);//渲染器尺寸
//     document.getElementById(canvasID).appendChild(threeConf.renderer.domElement);//内容都画在domelement上
//     threeConf.renderer.setClearColor(0x000000, 1.0);//设置缓冲区颜色
//
// //    场景
//     threeConf.scene = new THREE.Scene();
//
// //    摄像头
//     threeConf.camera = new THREE.PerspectiveCamera(60, canvasWidth / canvasHeight, cameraNear, cameraFar);
//     threeConf.camera.position.x = cameraX;
//     threeConf.camera.position.y = cameraY;
//     threeConf.camera.position.z = cameraZ;
//     threeConf.camera.up.x = 0;
//     threeConf.camera.up.y = 1;
//     threeConf.camera.up.z = 0;
//     threeConf.camera.lookAt(0, 0, 0);
//
// //    控制器
//     threeConf.control = new THREE.OrbitControls(threeConf.camera);
//
// //    监视器
//     threeConf.stats = new Stats();
//     threeConf.stats.domElement.style.position = "fixed";
//     threeConf.stats.domElement.style.left = "0px";
//     threeConf.stats.domElement.style.top = "0px";
//     document.getElementById(canvasID).appendChild(threeConf.stats.dom);
//     return threeConf;
//
// }
//
// function initThree_test() {
//     let cubeGeometry = new THREE.CubeGeometry(10, 10, 10);
//     let cubeMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
//     let cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
//     threeConf.scene.add(cubeMesh);
//     initThree_render(cubeMesh);
// }
//
// function initThree_render(cubeMesh) {
//     threeConf.stats.update();
//     requestAnimationFrame(function () {
//         initThree_render(cubeMesh);
//     });
//     cubeMesh.rotation.x += 0.1;
//     cubeMesh.rotation.y += 0.1;
//     threeConf.renderer.render(threeConf.scene, threeConf.camera)
// }


