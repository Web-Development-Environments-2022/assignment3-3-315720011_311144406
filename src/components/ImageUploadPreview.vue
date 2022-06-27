<template>
    <div>
        <img
        class="imagePreviewWrapper"
        :style="{ 'background-image': `url(${previewImage})` }">

        <b-form-file 
            ref="fileInput"
            type="file"
            @input="pickFile"
        ></b-form-file>
    </div>
    

</template>

<script>
export default {
    data() {
        return {
            previewImage: null
        };
    },
        
    methods: {
        selectImage () {
            this.$refs.fileInput.click()
        },
        pickFile () {
            let input = this.$refs.fileInput
            let file = [input.selectedFile]
            if (file && file[0]) {
            let reader = new FileReader
            reader.onload = e => {
                this.previewImage = e.target.result
            }
            reader.readAsDataURL(file[0])
            this.$emit('input', file[0])
            }
        },
        reset(){
            this.previewImage = null;
            this.$refs.fileInput.reset();
        }
    }
}
</script>

<style scoped lang="scss">
    .imagePreviewWrapper {
        width: 350px;
        height: 250px;
        display: block;
        cursor: pointer;
        margin: 0 auto 30px;
        background-size: cover;
        background-position: center center;
        border-radius: 6%;
        border-color: black;
        border-style: solid;
    }
</style>