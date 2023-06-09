function showLabel(id)
{
    const input = document.getElementById(id);
    if(input.value.lenght > 0 || input.value != ''){
        label = document.getElementById('lbl_' + id);
        label.style.display = 'none'
    }else{
        label = document.getElementById('lbl_' + id);
        label.style.display = 'block'
    }
}
