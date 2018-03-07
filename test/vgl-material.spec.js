describe('VglMaterial:', function suite() {
  const { VglMaterial, VglNamespace } = VueGL;
  const { expect } = chai;
  it('without properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-material ref="m" /></vgl-namespace>',
      components: { VglMaterial, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const expected = new THREE.Material();
        const { inst } = vm.$refs.m;
        expect(inst).to.deep.equal(Object.assign(expected, { uuid: inst.uuid }));
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-material vertex-colors="vertex" ref="m" /></vgl-namespace>',
      components: { VglMaterial, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const expected = new THREE.Material();
        expected.setValues({
          vertexColors: THREE.VertexColors,
        });
        const { inst } = vm.$refs.m;
        expect(inst).to.deep.equal(Object.assign(expected, { uuid: inst.uuid }));
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('after properties are changed', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-material :vertex-colors="vertexColors" ref="m" /></vgl-namespace>',
      components: { VglMaterial, VglNamespace },
      data: {
        vertexColors: 'vertex',
      },
    }).$mount();
    vm.$nextTick(() => {
      vm.vertexColors = 'face';
      vm.$nextTick(() => {
        try {
          const expected = new THREE.Material();
          expected.setValues({
            vertexColors: THREE.FaceColors,
          });
          const { inst } = vm.$refs.m;
          expect(inst).to.deep.equal(Object.assign(expected, { uuid: inst.uuid }));
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
